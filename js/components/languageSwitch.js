// Stockage de la langue actuelle (par défaut: français)
let currentLanguage = localStorage.getItem("preferredLanguage") || "fr";
let translations = {};

/**
 * Charge les traductions pour la langue spécifiée
 * @param {string} lang - Code de la langue à charger (fr, de, it)
 * @returns {Promise} - Promise avec les traductions
 */
async function loadTranslations(lang) {
  try {
    const response = await fetch(`./locales/${lang}.json`);
    translations = await response.json();
    return translations;
  } catch (error) {
    console.error(
      `Erreur lors du chargement des traductions (${lang}):`,
      error
    );
    return {};
  }
}

/**
 * Applique les traductions aux éléments de la page
 */
function applyTranslations() {
  // Trouver tous les éléments avec l'attribut data-i18n
  const elements = document.querySelectorAll("[data-i18n]");

  elements.forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const keys = key.split(".");

    // Trouver la traduction appropriée
    let translation = translations;
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        console.warn(`Traduction manquante pour la clé: ${key}`);
        return;
      }
    }

    // Appliquer la traduction
    if (typeof translation === "string") {
      if (element.tagName === "INPUT" && element.type === "placeholder") {
        element.placeholder = translation;
      } else {
        element.textContent = translation;
      }
    }
  });
}

/**
 * Change la langue de l'interface
 * @param {string} lang - Code de la langue (fr, de, it)
 */
async function changeLanguage(lang) {
  if (lang !== currentLanguage) {
    currentLanguage = lang;

    // Sauvegarder la préférence de langue
    localStorage.setItem("preferredLanguage", lang);

    // Charger et appliquer les traductions
    await loadTranslations(lang);
    applyTranslations();

    // Mettre à jour l'attribut lang du document
    document.documentElement.lang = lang;

    // Déclencher un événement pour informer d'autres scripts
    document.dispatchEvent(
      new CustomEvent("languageChanged", { detail: { language: lang } })
    );
  }
}

/**
 * Initialise le système de changement de langue
 */
async function initLanguageSystem() {
  // Charger les traductions pour la langue actuelle
  await loadTranslations(currentLanguage);

  // Appliquer les traductions initiales
  applyTranslations();

  // Définir la langue du document
  document.documentElement.lang = currentLanguage;

  // Ajouter des écouteurs d'événements aux boutons de langue
  const languageButtons = document.querySelectorAll("[data-lang]");
  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const lang = button.getAttribute("data-lang");
      changeLanguage(lang);
    });
  });
}

// Initialiser le système de langues au chargement du DOM
document.addEventListener("DOMContentLoaded", initLanguageSystem);

// Exporter les fonctions
export { changeLanguage, currentLanguage };
