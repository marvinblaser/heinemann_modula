// languageSwitch.js - Gestion du changement de langue
document.addEventListener('DOMContentLoaded', function() {
  initLanguageSwitch();
});

function initLanguageSwitch() {
  const languageOptions = document.querySelectorAll('.language-selector');
  
  languageOptions.forEach(option => {
      option.addEventListener('click', function() {
          // Retirer la classe active de tous les sélecteurs
          languageOptions.forEach(opt => {
              opt.classList.remove('active');
          });

          // Ajouter la classe active à l'option cliquée
          this.classList.add('active');

          // Changer la langue
          const lang = this.getAttribute('data-lang');
          changeLanguage(lang);
      });
  });
}
