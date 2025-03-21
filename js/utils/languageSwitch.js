// languageSwitch.js - Gestion du changement de langue
document.addEventListener('DOMContentLoaded', function() {
  initLanguageSwitch();
});

function initLanguageSwitch() {
  const languageOptions = document.querySelectorAll('.language-selector img');
  
  languageOptions.forEach(option => {
      option.addEventListener('click', function() {
          const lang = this.getAttribute('data-lang');
          changeLanguage(lang);
      });
  });
}
