// main.js - Gestion des traductions
const translations = {
  general: {
      seeMore: {
          fr: "Voir le catalogue",
          de: "Katalog ansehen",
          it: "Vedi il catalogo",
          en: "See the catalogue"
      },
      follow: {
          fr: "Suivez nous là-bas :",
          de: "Folgen Sie uns hier :",
          it: "Seguici qui :",
          en: "Follow us there :"
      },
      copyright: {
          fr: "© KBMedizintechnik GmbH",
          de: "© KBMedizinTechnik GmbH",
          it: "© KBMedizinTechnik GmbH",
          en: "© KBMedizinTechnik GmbH"
      }
  },
  navigation: {
      machine1: {
          fr: "Modula L",
          de: "Modula L",
          it: "Modula L",
          en: "Modula L"
      },
      machine2: {
          fr: "Modula M",
          de: "Modula M",
          it: "Modula M",
          en: "Modula M"
      },
      catalogue: {
          fr: "Catalogue",
          de: "Katalog",
          it: "Catalogo",
          en: "Catalogue"
      }
  },
  accordion: {
      colors: {
          fr: "Changer la couleur",
          de: "Farbe ändern",
          it: "Cambia colore",
          en: "Change color"
      },
      details: {
          fr: "Détails techniques",
          de: "Technische Details",
          it: "Dettagli tecnici",
          en: "Technical details"
      },
      customize: {
          fr: "Personnaliser ma machine",
          de: "Meine Maschine anpassen",
          it: "Personalizza la mia macchina",
          en: "Customize my machine"
      }
  },
  technical: {
      dimensions: {
          fr: "Dimensions",
          de: "Abmessungen",
          it: "Dimensioni",
          en: "Dimensions"
      },
      weight: {
          fr: "Poids",
          de: "Gewicht",
          it: "Peso",
          en: "Weight"
      },
      power: {
          fr: "Puissance",
          de: "Leistung",
          it: "Potenza",
          en: "Power"
      }
  },
  options: {
      option1: {
          fr: "Option 1",
          de: "Option 1",
          it: "Opzione 1",
          en: "Option 1"
      },
      option2: {
          fr: "Option 2",
          de: "Option 2",
          it: "Opzione 2",
          en: "Option 2"
      },
      option3: {
          fr: "Option 3",
          de: "Option 3",
          it: "Opzione 3",
          en: "Option 3"
      },
      saveConfig: {
          fr: "Enregistrer ma configuration",
          de: "Konfiguration speichern",
          it: "Salva la mia configurazione",
          en: "Save my configuration"
      }
  },
  form: {
      name: {
          fr: "Nom",
          de: "Name",
          it: "Nome",
          en: "Name"
      },
      firstname: {
          fr: "Prénom",
          de: "Vorname",
          it: "Cognome",
          en: "First name"
      },
      email: {
          fr: "Email",
          de: "E-Mail",
          it: "Email",
          en: "Email"
      },
      next: {
          fr: "Suivant",
          de: "Weiter",
          it: "Avanti",
          en: "Next"
      },
      back: {
          fr: "Retour",
          de: "Zurück",
          it: "Indietro",
          en: "Back"
      },
      confirm: {
          fr: "Confirmer",
          de: "Bestätigen",
          it: "Conferma",
          en: "Confirm"
      },
      close: {
          fr: "Fermer",
          de: "Schließen",
          it: "Chiudere",
          en: "Close"
      }
  },
  modal: {
      step1Title: {
          fr: "Vos coordonnées",
          de: "Ihre Kontaktdaten",
          it: "Le tue informazioni",
          en: "Your details"
      },
      step2Title: {
          fr: "Récapitulatif",
          de: "Zusammenfassung",
          it: "Riepilogo",
          en: "Summary"
      },
      step3Title: {
          fr: "Configuration enregistrée",
          de: "Konfiguration gespeichert",
          it: "Configurazione salvata",
          en: "Configuration saved"
      },
      colorChosen: {
          fr: "Couleur choisie:",
          de: "Gewählte Farbe:",
          it: "Colore scelto:",
          en: "Color chosen:"
      },
      optionsChosen: {
          fr: "Options choisies:",
          de: "Gewählte Optionen:",
          it: "Opzioni scelte:",
          en: "Options chosen:"
      },
      thankYou: {
          fr: "Merci! Votre configuration a été enregistrée.",
          de: "Danke! Ihre Konfiguration wurde gespeichert.",
          it: "Grazie! La tua configurazione è stata salvata.",
          en: "Thank you! Your configuration has been saved."
      },
      emailSent: {
          fr: "Un email récapitulatif vous a été envoyé.",
          de: "Eine Zusammenfassungs-E-Mail wurde Ihnen gesendet.",
          it: "Un'email riepilogativa ti è stata inviata.",
          en: "A summary email has been sent to you."
      }
  }
};

let currentLanguage = 'fr'; // Langue par défaut

// Appliquer les traductions
function applyTranslations() {
  document.querySelectorAll('[data-translate]').forEach(element => {
      const key = element.getAttribute('data-translate');
      const translation = translations[key] ? translations[key][currentLanguage] : null; // Vérifie si la clé existe
      if (translation) {
          element.textContent = translation;
      } else {
          console.warn(`Translation not found for key: ${key}`); // Avertir si la traduction n'est pas trouvée
      }
  });
}

// Changer la langue
function changeLanguage(lang) {
  currentLanguage = lang;
  applyTranslations();
}

// Exemple d'utilisation
document.querySelectorAll('.language-selector img').forEach(img => {
  img.addEventListener('click', function() {
      const lang = this.getAttribute('data-lang');
      changeLanguage(lang);
  });
});

// Appliquer les traductions au chargement de la page
document.addEventListener('DOMContentLoaded', applyTranslations);
