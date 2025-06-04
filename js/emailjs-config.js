(function() {
  'use strict';
  
  console.log('=== SCRIPT EMAILJS DÉMARRE ===');
  
  document.addEventListener("DOMContentLoaded", function () {
  // Initialisation EmailJS avec la nouvelle clé publique
  emailjs.init({
    publicKey: "VPVu1JsENfGudAZkR"
  });
  
  console.log('EmailJS initialisé');
  
  initFormValidation();
  initModalHandlers();
  initLanguageHandlers();
});

// Configuration EmailJS
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_tuw71tf',
  TEMPLATE_ID: 'template_50exznp'
};

// ========================================================
// Gestion des formulaires et validation
// ========================================================
function initFormValidation() {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      if (form.getAttribute("data-js-submit") === "true") {
        e.preventDefault();
      }
      if (!validateForm(form)) {
        e.preventDefault();
      } else {
        console.log("Formulaire validé !");
        if (form.id === "userInfoForm") {
          closeCoordinatesModal();
          openSummaryModal();
        }
      }
    });

    const inputs = form.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        validateInput(this);
      });
      input.addEventListener("input", function () {
        if (this.classList.contains("invalid")) {
          this.classList.remove("invalid");
          const errorMessage = this.nextElementSibling;
          if (errorMessage && errorMessage.classList.contains("error-message")) {
            errorMessage.remove();
          }
        }
      });
    });
  });
}

function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll("input, select, textarea");
  inputs.forEach((input) => {
    if (!validateInput(input)) {
      isValid = false;
    }
  });
  return isValid;
}

function validateInput(input) {
  if (input.disabled || input.readOnly) {
    return true;
  }
  let isValid = true;
  let errorMessage = "";
  const existingError = input.nextElementSibling;
  if (existingError && existingError.classList.contains("error-message")) {
    existingError.remove();
  }
  if (input.hasAttribute("required") && !input.value.trim()) {
    isValid = false;
    errorMessage = "Ce champ est requis";
  } else if (
    input.type === "email" &&
    input.value.trim() &&
    !validateEmail(input.value)
  ) {
    isValid = false;
    errorMessage = "Veuillez entrer une adresse email valide";
  } else if (input.hasAttribute("pattern") && input.value.trim()) {
    const pattern = new RegExp(input.getAttribute("pattern"));
    if (!pattern.test(input.value)) {
      isValid = false;
      errorMessage = input.title || "Format invalide";
    }
  } else if (
    input.hasAttribute("minlength") &&
    input.value.length < parseInt(input.getAttribute("minlength"))
  ) {
    isValid = false;
    errorMessage = `Minimum ${input.getAttribute("minlength")} caractères requis`;
  }
  if (!isValid) {
    input.classList.add("invalid");
    const errorElement = document.createElement("div");
    errorElement.classList.add("error-message");
    errorElement.textContent = errorMessage;
    input.insertAdjacentElement("afterend", errorElement);
  } else {
    input.classList.remove("invalid");
  }
  return isValid;
}

function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
}

// ========================================================
// Envoi de l'email via EmailJS (VERSION DÉBOGUÉE)
// ========================================================
async function sendConfigurationEmail() {
  console.log('=== DÉBUT ENVOI EMAIL ===');
  
  const loadingSpinner = document.querySelector(".loading-spinner");
  
  try {
    // Afficher le spinner
    if (loadingSpinner) {
      loadingSpinner.classList.remove("hide");
    }

    // Débogage : Vérifier les éléments DOM
    const nameElement = document.getElementById("name");
    const firstnameElement = document.getElementById("firstname");
    const emailElement = document.getElementById("email");
    
    console.log('Éléments trouvés:', {
      name: nameElement,
      firstname: firstnameElement,
      email: emailElement
    });

    if (!emailElement) {
      throw new Error("L'élément email n'a pas été trouvé dans le DOM");
    }

    // Récupération des données utilisateur
    const name = nameElement?.value?.trim() || '';
    const firstname = firstnameElement?.value?.trim() || '';
    const email = emailElement?.value?.trim() || '';

    console.log('Données récupérées:', {
      name: name,
      firstname: firstname,
      email: email
    });

    // Validation email
    if (!email) {
      throw new Error("L'adresse email est vide");
    }
    
    if (!validateEmail(email)) {
      throw new Error("L'adresse email n'est pas valide");
    }

    // Récupération de la couleur sélectionnée
    let selectedColor = "Non spécifiée";
    const colorElement = document.querySelector('.color-option.active');
    console.log('Élément couleur trouvé:', colorElement);
    
    if (colorElement) {
      const colorClass = Array.from(colorElement.classList).find(cls => cls.startsWith('color-ral'));
      if (colorClass) {
        selectedColor = colorClass.replace('color-', '').toUpperCase();
      }
    }
    console.log('Couleur sélectionnée:', selectedColor);

    // Récupération des options depuis sessionStorage
    const storedOptions = sessionStorage.getItem("selectedOptions");
    const selectedOptions = storedOptions 
      ? JSON.parse(storedOptions).join(", ") 
      : "Aucune option sélectionnée";
    
    console.log('Options sélectionnées:', selectedOptions);

    // Langue actuelle
    const selectedLanguage = window.currentLanguage || "fr";
    console.log('Langue sélectionnée:', selectedLanguage);

    // Préparation du contenu email complet
    const emailContent = prepareFullEmailContent(
      selectedLanguage,
      firstname,
      name,
      selectedColor,
      selectedOptions
    );

    console.log('Contenu email préparé:', emailContent);

    // IMPORTANT: Seuls les paramètres utilisés dans le template
    const templateParams = {
      to_email: email,
      message: emailContent
    };

    console.log('Paramètres template:', templateParams);
    console.log('Configuration EmailJS:', EMAILJS_CONFIG);

    // Envoi de l'email
    console.log('Tentative d\'envoi...');
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams
    );

    console.log('✅ Email envoyé avec succès:', response);
    completeEmailSending(true);

  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi:', error);
    console.error('Type d\'erreur:', typeof error);
    console.error('Message d\'erreur:', error.message);
    console.error('Status:', error.status);
    console.error('Text:', error.text);
    
    let errorMessage = "Une erreur est survenue lors de l'envoi de l'email.";
    
    if (error.status === 400) {
      errorMessage = "Erreur 400 - Paramètres invalides. Vérifiez les données saisies.";
    } else if (error.status === 401) {
      errorMessage = "Erreur 401 - Clé publique EmailJS invalide.";
    } else if (error.status === 404) {
      errorMessage = "Erreur 404 - Service ou template EmailJS introuvable.";
    } else if (error.text) {
      errorMessage = `Erreur EmailJS: ${error.text}`;
    } else if (error.message) {
      errorMessage = `Erreur: ${error.message}`;
    }
    
    alert(errorMessage);
    completeEmailSending(false);
    
  } finally {
    if (loadingSpinner) {
      loadingSpinner.classList.add("hide");
    }
    console.log('=== FIN ENVOI EMAIL ===');
  }
}

// Fonction pour préparer le contenu COMPLET de l'email
function prepareFullEmailContent(language, firstname, name, selectedColor, selectedOptions) {
  const messages = {
    fr: {
      subject: '🎉 Votre configuration MODULA L a été enregistrée !',
      greeting: `Bonjour ${firstname} ${name},`,
      confirmation: 'Nous confirmons que votre configuration pour le MODULA L a été enregistrée.',
      contact: 'Nous vous contacterons dès que possible pour finaliser votre commande.',
      thankYou: 'Merci pour votre confiance.',
      seeYouSoon: 'À bientôt !',
      recap: 'RÉCAPITULATIF DE VOTRE CONFIGURATION :',
      colorChosen: `• Couleur sélectionnée : ${selectedColor}`,
      optionsChosen: `• Options choisies : ${selectedOptions}`,
      companyInfo: `
---
KBMED Medizintechnik
Gewerbestrasse 6
4105 Biel-Benken
Suisse

📞 Büro : +41 61 331 68 51
📱 Mobile : +41 78 683 68 28
📠 Fax : +41 61 331 68 52
✉️ Email : info@kbmed.ch`
    },
    de: {
      subject: '🎉 Ihre MODULA L Konfiguration wurde gespeichert!',
      greeting: `Guten Tag ${firstname} ${name},`,
      confirmation: 'Wir bestätigen, dass Ihre Konfiguration für den MODULA L gespeichert wurde.',
      contact: 'Wir werden Sie so schnell wie möglich kontaktieren, um Ihre Bestellung abzuschliessen.',
      thankYou: 'Vielen Dank für Ihr Vertrauen.',
      seeYouSoon: 'Bis bald!',
      recap: 'ZUSAMMENFASSUNG IHRER KONFIGURATION:',
      colorChosen: `• Gewählte Farbe: ${selectedColor}`,
      optionsChosen: `• Gewählte Optionen: ${selectedOptions}`,
      companyInfo: `
---
KBMED Medizintechnik
Gewerbestrasse 6
4105 Biel-Benken
Schweiz

📞 Büro : +41 61 331 68 51
📱 Mobile : +41 78 683 68 28
📠 Fax : +41 61 331 68 52
✉️ Email : info@kbmed.ch`
    },
    it: {
      subject: '🎉 La tua configurazione MODULA L è stata salvata!',
      greeting: `Buongiorno ${firstname} ${name},`,
      confirmation: 'Confermiamo che la configurazione del MODULA L è stata salvata.',
      contact: 'Ti contatteremo il prima possibile per finalizzare il tuo ordine.',
      thankYou: 'Grazie per la tua fiducia.',
      seeYouSoon: 'A presto!',
      recap: 'RIEPILOGO DELLA TUA CONFIGURAZIONE:',
      colorChosen: `• Colore scelto: ${selectedColor}`,
      optionsChosen: `• Opzioni scelte: ${selectedOptions}`,
      companyInfo: `
---
KBMED Medizintechnik
Gewerbestrasse 6
4105 Biel-Benken
Svizzera

📞 Büro : +41 61 331 68 51
📱 Mobile : +41 78 683 68 28
📠 Fax : +41 61 331 68 52
✉️ Email : info@kbmed.ch`
    }
  };

  const msg = messages[language] || messages.fr;
  
  return `${msg.greeting}

${msg.confirmation}

${msg.contact}

${msg.thankYou}

${msg.seeYouSoon}

${msg.recap}

${msg.colorChosen}

${msg.optionsChosen}

${msg.companyInfo}`;
}

function completeEmailSending(success) {
  if (success) {
    alert("Votre configuration a été enregistrée et un email récapitulatif vous a été envoyé.");
    closeSummaryModal();
  } else {
    console.log("Échec de l'envoi de l'email");
  }
}

// ========================================================
// Gestion des modals
// ========================================================
function initModalHandlers() {
  const openOptionsBtn = document.getElementById("openOptionsBtn");
  const optionsModal = document.getElementById("optionsModal");
  const validateOptionsBtn = document.getElementById("validateOptions");
  const closeOptionsBtn = document.getElementById("closeOptions");

  const coordinatesModal = document.getElementById("coordinatesModal");
  const closeCoordinatesBtn = document.getElementById("closeCoordinates");

  const summaryModal = document.getElementById("summaryModal");
  const closeSummaryBtn = document.getElementById("closeSummary");
  const confirmOrderBtn = document.getElementById("confirmOrder");

  // Ouvrir le modal options
  if (openOptionsBtn) {
    openOptionsBtn.addEventListener("click", function () {
      console.log('Ouverture du modal options');
      optionsModal.classList.add("active");
    });
  }

  // Valider les options et passer aux coordonnées
  if (validateOptionsBtn) {
    validateOptionsBtn.addEventListener("click", function () {
      const checkedOptions = document.querySelectorAll(
        ".checkbox-container input[type='checkbox']:checked"
      );
      const selectedOptions = Array.from(checkedOptions).map((checkbox) =>
        checkbox.closest(".checkbox-container").querySelector(".label").textContent.trim()
      );
      sessionStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
      console.log("Options sélectionnées :", selectedOptions);
      optionsModal.classList.remove("active");
      coordinatesModal.classList.add("active");
    });
  }

  // Fermer les modals
  if (closeOptionsBtn) {
    closeOptionsBtn.addEventListener("click", function () {
      optionsModal.classList.remove("active");
    });
  }

  if (closeCoordinatesBtn) {
    closeCoordinatesBtn.addEventListener("click", function () {
      coordinatesModal.classList.remove("active");
    });
  }

  if (closeSummaryBtn) {
    closeSummaryBtn.addEventListener("click", function () {
      summaryModal.classList.remove("active");
    });
  }

  // Confirmer la commande = envoyer l'email
  if (confirmOrderBtn) {
    confirmOrderBtn.addEventListener("click", function () {
      console.log('Clic sur confirmer commande');
      sendConfigurationEmail();
    });
  }
}

function closeCoordinatesModal() {
  const coordinatesModal = document.getElementById("coordinatesModal");
  if (coordinatesModal) {
    coordinatesModal.classList.remove("active");
  }
}

function openSummaryModal() {
  console.log('Ouverture du modal récapitulatif');
  
  // Récupération de la couleur active
  let selectedColor = "RAL 9016"; // Couleur par défaut
  const activeColorElement = document.querySelector('.color-option.active');
  if (activeColorElement) {
    const colorClass = Array.from(activeColorElement.classList).find(cls => cls.startsWith('color-ral'));
    if (colorClass) {
      selectedColor = colorClass.replace('color-', '').toUpperCase();
    }
  }

  // Mise à jour du récapitulatif
  const colorNameElement = document.getElementById("colorName");
  const colorSampleElement = document.getElementById("colorSample");
  
  if (colorNameElement) {
    colorNameElement.textContent = selectedColor;
  }
  
  if (colorSampleElement && activeColorElement) {
    colorSampleElement.className = activeColorElement.className.replace('color-option', 'color-sample');
  }

  // Récupération des options
  const storedOptions = sessionStorage.getItem("selectedOptions");
  const selectedOptions = storedOptions
    ? JSON.parse(storedOptions).join(", ")
    : "Aucune option sélectionnée";

  const summaryOptionsElement = document.getElementById("summaryOptions");
  if (summaryOptionsElement) {
    summaryOptionsElement.textContent = "Options choisies : " + selectedOptions;
  }

  // Afficher le modal
  const summaryModal = document.getElementById("summaryModal");
  if (summaryModal) {
    summaryModal.classList.add("active");
  }
}

function closeSummaryModal() {
  const summaryModal = document.getElementById("summaryModal");
  if (summaryModal) {
    summaryModal.classList.remove("active");
  }
}

// ========================================================
// Gestion des langues
// ========================================================
function initLanguageHandlers() {
  const languageSelectors = document.querySelectorAll(".language-selector");
  
  // Définir le français comme langue par défaut
  window.currentLanguage = "fr";
  
  languageSelectors.forEach((selector) => {
    selector.addEventListener("click", function () {
      languageSelectors.forEach((el) => el.classList.remove("active"));
      this.classList.add("active");
      window.currentLanguage = this.querySelector("img").getAttribute("data-lang");
      console.log("Langue sélectionnée :", window.currentLanguage);
    });
  });
}

// ========================================================
// Fonctions de test et débogage
// ========================================================
function testEmailJSConfiguration() {
  console.log('=== Test Configuration EmailJS ===');
  console.log('Service ID:', EMAILJS_CONFIG.SERVICE_ID);
  console.log('Template ID:', EMAILJS_CONFIG.TEMPLATE_ID);
  console.log('EmailJS disponible:', typeof emailjs);
  
  // Test avec les MÊMES paramètres que le template
  const testParams = {
    to_email: 'marvinblaser.pro@gmail.com',
    message: `Test de configuration EmailJS

Bonjour,

Ceci est un test pour vérifier que la configuration EmailJS fonctionne correctement.

RÉCAPITULATIF DE VOTRE CONFIGURATION :

• Couleur sélectionnée : RAL 9016
• Options choisies : Test option 1, Test option 2

---
KBMED Medizintechnik
Gewerbestrasse 6
4105 Biel-Benken
Suisse

📞 Büro : +41 61 331 68 51
📱 Mobile : +41 78 683 68 28
📠 Fax : +41 61 331 68 52
✉️ Email : info@kbmed.ch`
  };
  
  console.log('Test avec paramètres:', testParams);
  
  emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, testParams)
    .then(response => {
      console.log('✅ Test réussi!', response);
      alert('Test réussi ! Vérifiez votre boîte email.');
    })
    .catch(error => {
      console.error('❌ Test échoué:', error);
      alert('Test échoué : ' + (error.text || error.message));
    });
}

function testFormValues() {
  console.log('=== TEST VALEURS FORMULAIRE ===');
  
  const nameEl = document.getElementById("name");
  const firstnameEl = document.getElementById("firstname");
  const emailEl = document.getElementById("email");
  
  console.log('Name element:', nameEl);
  console.log('Firstname element:', firstnameEl);
  console.log('Email element:', emailEl);
  
  if (nameEl) console.log('Name value:', nameEl.value);
  if (firstnameEl) console.log('Firstname value:', firstnameEl.value);
  if (emailEl) console.log('Email value:', emailEl.value);
}

// Exposer les fonctions de test globalement
window.testEmailJS = testEmailJSConfiguration;
window.testFormValues = testFormValues;
window.sendConfigurationEmail = sendConfigurationEmail;

console.log('Script chargé. Fonctions disponibles: testEmailJS(), testFormValues(), sendConfigurationEmail()');
  
})();