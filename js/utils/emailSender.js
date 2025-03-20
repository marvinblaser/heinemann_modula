// emailSender.js - Gestion de l'envoi d'emails avec EmailJS
document.addEventListener('DOMContentLoaded', function() {
  initEmailSender();
});

// Configuration EmailJS
const EMAIL_SERVICE_ID = 'YOUR_SERVICE_ID'; // Remplacez par votre Service ID
const EMAIL_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Remplacez par votre Template ID
const EMAIL_USER_ID = 'YOUR_USER_ID'; // Remplacez par votre User ID

function initEmailSender() {
  // Initialiser EmailJS si disponible
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAIL_USER_ID);
  }
  
  // Écouteur pour le bouton de confirmation dans le modal
  const confirmBtn = document.querySelector('.confirm-btn');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', sendConfigurationEmail);
  }
}

// Envoyer l'email de configuration
function sendConfigurationEmail() {
  // Afficher le spinner de chargement
  const loadingSpinner = document.querySelector('.loading-spinner');
  if (loadingSpinner) {
    loadingSpinner.classList.remove('hide');
  }
  
  // Collecter les données du formulaire
  const name = document.getElementById('name')?.value || '';
  const firstname = document.getElementById('firstname')?.value || '';
  const email = document.getElementById('email')?.value || '';
  
  // Récupérer la couleur sélectionnée
  const selectedColorElement = document.getElementById('selectedColor');
  const selectedColor = selectedColorElement ? selectedColorElement.textContent : '';
  
  // Récupérer les options sélectionnées
  const selectedOptionsElement = document.getElementById('selectedOptions');
  const selectedOptions = selectedOptionsElement ? 
    Array.from(selectedOptionsElement.querySelectorAll('li')).map(li => li.textContent).join(', ') : '';
  
  // Préparer les paramètres pour le template
  const templateParams = {
    to_name: `${firstname} ${name}`,
    to_email: email,
    machine_model: 'MODULA L',
    selected_color: selectedColor,
    selected_options: selectedOptions,
    date: new Date().toLocaleDateString()
  };
  
  // Si EmailJS est disponible, envoyer l'email
  if (typeof emailjs !== 'undefined') {
    emailjs.send(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, templateParams)
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        completeEmailSending(true);
      }, function(error) {
        console.log('FAILED...', error);
        completeEmailSending(false);
      });
  } else {
    // Simuler un envoi réussi pour le développement
    console.log('EmailJS not loaded, simulating email sending');
    console.log('Email params:', templateParams);
    
    // Simuler un délai d'envoi
    setTimeout(() => {
      completeEmailSending(true);
    }, 1500);
  }
}

// Compléter le processus d'envoi d'email
function completeEmailSending(success) {
  // Cacher le spinner
  const loadingSpinner = document.querySelector('.loading-spinner');
  if (loadingSpinner) {
    loadingSpinner.classList.add('hide');
  }
  
  if (success) {
    // Passer à l'étape de confirmation
    const step2 = document.getElementById('modalStep2');
    const step3 = document.getElementById('modalStep3');
    
    if (step2 && step3) {
      step2.classList.remove('active');
      step3.classList.add('active');
    }
  } else {
    // Afficher un message d'erreur
    alert('Une erreur est survenue lors de l\'envoi de l\'email. Veuillez réessayer.');
  }
}
