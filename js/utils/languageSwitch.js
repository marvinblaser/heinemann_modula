// languageSwitch.js - Gestion du changement de langue
document.addEventListener(document.querySelector(".settings-item"), function() {
  initLanguageSwitch();
});

function initLanguageSwitch() {
  const languageOptions = document.querySelectorAll('.language-selector');

  // Retirer les anciens écouteurs d'événements pour éviter les doublons
  languageOptions.forEach(option => {
      option.removeEventListener('click', handleLanguageChange); // Assurez-vous de retirer l'écouteur
      option.addEventListener('click', handleLanguageChange);
  });
}

// Fonction pour gérer le changement de langue
function handleLanguageChange() {
  const languageOptions = document.querySelectorAll('.language-selector img');

  // Retirer la classe active de tous les sélecteurs
  languageOptions.forEach(opt => {
      opt.classList.remove('active');
  });

  // Ajouter la classe active à l'option cliquée
  this.classList.add('active');

  // Changer la langue
  const lang = this.getAttribute('data-lang');
  changeLanguage(lang);
}

// Changer la langue
function changeLanguage(lang) {
  currentLanguage = lang; // Mettre à jour la langue actuelle
  applyTranslations(); // Appliquer les traductions
  console.log(currentLanguage); // Vérifier la langue actuelle
}
