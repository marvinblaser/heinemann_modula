// languageSwitch.js - Gestion du changement de langue
document.addEventListener('DOMContentLoaded', function() {
  initLanguageSwitch();
});

function initLanguageSwitch() {
  const settingsBtn = document.querySelector('.settings-btn');
  const languageDropdown = document.querySelector('.language-dropdown');
  
  // Afficher le menu de langue au clic sur le bouton des paramètres
  // if (settingsBtn && languageDropdown) {
  //   settingsBtn.addEventListener('click', function(e) {
  //     e.stopPropagation();
  //     languageDropdown.classList.toggle('hide');
  //   });
    
  //   // Fermer le menu de langue au clic à l'extérieur
  //   document.addEventListener('click', function(e) {
  //     if (!languageDropdown.contains(e.target) && e.target !== settingsBtn) {
  //       languageDropdown.classList.add('hide');
  //     }
  //   });
  // }

  // Gérer le changement de langue
  const languageOptions = document.querySelectorAll('.language-option');
  languageOptions.forEach(option => {
    option.addEventListener('click', function() {
      const lang = this.getAttribute('data-lang');
      changeLanguage(lang);
    });
  });
}

// Fonction pour changer la langue
function changeLanguage(lang) {
  // Logique pour changer la langue
  console.log(`Langue changée en: ${lang}`);
  // Charger les traductions et appliquer
  loadTranslations(lang).then(applyTranslations);
}
