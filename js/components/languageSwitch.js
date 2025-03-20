// languageSwitch.js - Gestion du changement de langue
document.addEventListener('DOMContentLoaded', function() {
  initLanguageSwitch();
});

// Langue actuelle (par défaut: français)
let currentLanguage = localStorage.getItem('preferredLanguage') || 'fr';
let translations = {};

async function initLanguageSwitch() {
  // Charger les traductions pour la langue actuelle
  await loadTranslations(currentLanguage);
  
  // Appliquer les traductions initiales
  applyTranslations();
  
  // Gérer les boutons de langue
  const languageButtons = document.querySelectorAll('[data-lang]');
  
  languageButtons.forEach(button => {
    button.addEventListener('click', async function() {
      const lang = this.getAttribute('data-lang');
      if (lang !== currentLanguage) {
        currentLanguage = lang;
        localStorage.setItem('preferredLanguage', lang);
        
        // Charger et appliquer les nouvelles traductions
        await loadTranslations(lang);
        applyTranslations();
        
        // Mise à jour visuelle du bouton de langue actif
        languageButtons.forEach(btn => {
          btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
        
        // Fermer le menu des paramètres
        const settingsMenu = document.querySelector('.settings-menu');
        if (settingsMenu) {
          settingsMenu.classList.remove('active');
        }
        
        // Mettre à jour l'affichage de la langue active
        updateLanguageDisplay(lang);
      }
    });
  });
  
  // Mise à jour initiale de l'affichage de langue
  updateLanguageDisplay(currentLanguage);
}

// Charger les traductions depuis le fichier JSON
async function loadTranslations(lang) {
  try {
    const response = await fetch(`locales/${lang}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load translations for ${lang}`);
    }
    translations = await response.json();
    return translations;
  } catch (error) {
    console.error('Error loading translations:', error);
    return {};
  }
}

// Appliquer les traductions aux éléments avec data-i18n
function applyTranslations() {
  const elements = document.querySelectorAll('[data-i18n]');
  
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    const keys = key.split('.');
    
    // Naviguer dans l'objet de traductions pour trouver la valeur
    let translation = translations;
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        console.warn(`Missing translation for key: ${key}`);
        return;
      }
    }
    
    // Appliquer la traduction si c'est une chaîne de caractères
    if (typeof translation === 'string') {
      if (element.tagName === 'INPUT' && element.getAttribute('type') === 'placeholder') {
        element.placeholder = translation;
      } else {
        element.textContent = translation;
      }
    }
  });
  
  // Mettre à jour l'attribut lang du document
  document.documentElement.lang = currentLanguage;
}

// Mettre à jour l'affichage de la langue actuelle
function updateLanguageDisplay(lang) {
  const languageSelector = document.querySelector('.language-selector');
  if (languageSelector) {
    // Mettre à jour l'affichage (par exemple, changer le drapeau)
    const flagImage = languageSelector.querySelector('img');
    if (flagImage) {
      flagImage.src = `assets/icons/flag-${lang}.svg`;
      flagImage.alt = getLangName(lang);
    }
  }
}

// Obtenir le nom complet de la langue
function getLangName(code) {
  const langNames = {
    'fr': 'Français',
    'de': 'Deutsch',
    'it': 'Italiano'
  };
  return langNames[code] || code.toUpperCase();
}
