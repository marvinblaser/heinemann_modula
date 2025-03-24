// languageSwitch.js - Gestion du changement de langue
document.addEventListener('DOMContentLoaded', function() {
  initLanguageSwitch();
});

function initLanguageSwitch() {
  const languageOptions = document.querySelectorAll('.language-selector img');

  languageOptions.forEach(option => {
      option.addEventListener('click', handleLanguageChange);
  });
}

// Fonction pour gérer le changement de langue
function handleLanguageChange() {
  const languageOptions = document.querySelectorAll('.language-selector img');
  const languageCase = document.querySelectorAll(".language-selector")

  // Retirer la classe active de tous les sélecteurs
  languageCase.forEach(opt => {
      opt.classList.remove('active');
  });

  // Ajouter la classe active à l'option cliquée
  this.parentElement.classList.add('active');

  // Changer la langue
  const lang = this.getAttribute('data-lang');
  changeLanguage(lang);
}

// Changer la langue
function changeLanguage(lang) {
  if (lang) {
      currentLanguage = lang; // Mettre à jour la langue actuelle
      applyTranslations(); // Appliquer les traductions
      console.log(currentLanguage); // Vérifier la langue actuelle
  } else {
      console.warn('Langue non définie'); // Avertir si la langue est indéfinie
  }
}
