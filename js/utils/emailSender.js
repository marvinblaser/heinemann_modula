// Configuration EmailJS
const EMAIL_SERVICE_ID = "YOUR_EMAILJS_SERVICE_ID";
const EMAIL_TEMPLATE_ID_CLIENT = "YOUR_EMAILJS_TEMPLATE_ID_CLIENT";
const EMAIL_TEMPLATE_ID_ADMIN = "YOUR_EMAILJS_TEMPLATE_ID_ADMIN";
const EMAIL_USER_ID = "YOUR_EMAILJS_USER_ID";

// Initialiser EmailJS
(function () {
  emailjs.init(EMAIL_USER_ID);
})();

/**
 * Envoie un email de confirmation au client et une notification à l'entreprise
 * @param {Object} userData - Données de l'utilisateur (nom, prénom, email)
 * @param {Object} configData - Données de configuration (couleur, options)
 * @returns {Promise} - Promise avec résultat de l'envoi
 */
function sendConfigurationEmails(userData, configData) {
  // Préparer les données pour les templates
  const templateParams = {
    to_name: `${userData.firstname} ${userData.name}`,
    to_email: userData.email,
    selected_color: configData.color,
    selected_options: configData.options.join(", "),
    date: new Date().toLocaleDateString(),
  };

  // Envoyer l'email au client
  const clientEmailPromise = emailjs.send(
    EMAIL_SERVICE_ID,
    EMAIL_TEMPLATE_ID_CLIENT,
    templateParams
  );

  // Envoyer l'email à l'hébergeur/entreprise
  const adminEmailPromise = emailjs.send(
    EMAIL_SERVICE_ID,
    EMAIL_TEMPLATE_ID_ADMIN,
    {
      ...templateParams,
      client_email: userData.email,
      client_name: `${userData.firstname} ${userData.name}`,
    }
  );

  // Retourner une promesse qui attend que les deux emails soient envoyés
  return Promise.all([clientEmailPromise, adminEmailPromise])
    .then((responses) => {
      console.log("Emails envoyés avec succès", responses);
      return {
        success: true,
        message: "Emails envoyés avec succès",
      };
    })
    .catch((errors) => {
      console.error("Erreur lors de l'envoi des emails", errors);
      return {
        success: false,
        message: "Échec de l'envoi des emails",
        errors,
      };
    });
}

/**
 * Prépare et envoie les emails de configuration
 */
function handleConfigurationSubmission() {
  // Récupérer les informations du formulaire
  const userData = {
    name: document.getElementById("name").value,
    firstname: document.getElementById("firstname").value,
    email: document.getElementById("email").value,
  };

  // Récupérer la couleur sélectionnée
  const selectedColor = document.getElementById("selectedColor").textContent;

  // Récupérer les options sélectionnées
  const optionElements = document.querySelectorAll("#selectedOptions li");
  const selectedOptions = Array.from(optionElements).map(
    (el) => el.textContent
  );

  const configData = {
    color: selectedColor,
    options: selectedOptions,
  };

  // Afficher le spinner ou indication de chargement
  document.getElementById("sendingIndicator").classList.remove("hide");

  // Envoyer les emails
  sendConfigurationEmails(userData, configData).then((result) => {
    // Cacher l'indicateur de chargement
    document.getElementById("sendingIndicator").classList.add("hide");

    if (result.success) {
      // Afficher le message de succès
      document.getElementById("modalStep2").classList.remove("active");
      document.getElementById("modalStep3").classList.add("active");
    } else {
      // Afficher un message d'erreur
      alert(
        "Une erreur est survenue lors de l'envoi des emails. Veuillez réessayer."
      );
    }
  });
}

// Exporter les fonctions pour les utiliser dans d'autres fichiers
export { sendConfigurationEmails, handleConfigurationSubmission };
