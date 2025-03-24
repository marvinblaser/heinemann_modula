// main.js - Gestion des traductions
emailjs.init("atUIFstP0TCmRcmjx");

// main.js - Gestion des traductions
const translations = {
    general: {
        seeMore: {
            fr: "Voir le catalogue",
            de: "Katalog ansehen",
            it: "Vedi il catalogo"
        },
        follow: {
            fr: "Suivez nous là-bas :",
            de: "Folgen Sie uns hier :",
            it: "Seguici qui :"
        },
        copyright: {
            fr: "© KBMedizintechnik GmbH",
            de: "© KBMedizinTechnik GmbH",
            it: "© KBMedizinTechnik GmbH"
        }
    },
    navigation: {
        machine1: {
            fr: "MODULA L",
            de: "MODULA L",
            it: "MODULA L"
        },
        machine2: {
            fr: "MODULA M",
            de: "MODULA M",
            it: "MODULA M"
        },
        catalogue: {
            fr: "CATALOGUE",
            de: "KATALOG",
            it: "CATALOGO"
        }
    },
    accordion: {
        colors: {
            fr: "Changer la couleur",
            de: "Farbe ändern",
            it: "Cambia colore"
        },
        details: {
            fr: "Détails techniques",
            de: "Technische Details",
            it: "Dettagli tecnici"
        },
        customize: {
            fr: "Personnaliser ma machine",
            de: "Meine Maschine anpassen",
            it: "Personalizza la mia macchina"
        }
    },
    technical: {
        dimensions: {
            fr: "Dimensions : 120 x 80 x 60 cm",
            de: "Abmessungen : 120 x 80 x 60 cm",
            it: "Dimensioni : 120 x 80 x 60 cm"
        },
        weight: {
            fr: "Poids : 85 kg",
            de: "Gewicht : 85 kg",
            it: "Peso : 85 kg"
        },
        power: {
            fr: "Puissance : 2000W",
            de: "Leistung : 2000W",
            it: "Potenza : 2000W"
        }
    },
    options: {
        option1: {
            fr: "Option 1",
            de: "Option 1",
            it: "Opzione 1"
        },
        option2: {
            fr: "Option 2",
            de: "Option 2",
            it: "Opzione 2"
        },
        option3: {
            fr: "Option 3",
            de: "Option 3",
            it: "Opzione 3",
        },
        saveConfig: {
            fr: "Enregistrer ma configuration",
            de: "Konfiguration speichern",
            it: "Salva la mia configurazione"
        }
    },
    form: {
        name: {
            fr: "Nom",
            de: "Name",
            it: "Nome"
        },
        firstname: {
            fr: "Prénom",
            de: "Vorname",
            it: "Cognome"
        },
        email: {
            fr: "Email",
            de: "E-Mail",
            it: "Email"
        },
        next: {
            fr: "Suivant",
            de: "Weiter",
            it: "Avanti"
        },
        back: {
            fr: "Retour",
            de: "Zurück",
            it: "Indietro"
        },
        confirm: {
            fr: "Confirmer",
            de: "Bestätigen",
            it: "Conferma"
        },
        close: {
            fr: "Fermer",
            de: "Schließen",
            it: "Chiudere"
        }
    },
    modal: {
        step1Title: {
            fr: "Vos coordonnées",
            de: "Ihre Kontaktdaten",
            it: "Le tue informazioni"
        },
        step2Title: {
            fr: "Récapitulatif",
            de: "Zusammenfassung",
            it: "Riepilogo"
        },
        step3Title: {
            fr: "Configuration enregistrée",
            de: "Konfiguration gespeichert",
            it: "Configurazione salvata"
        },
        colorChosen: {
            fr: "Couleur choisie:",
            de: "Gewählte Farbe:",
            it: "Colore scelto:"
        },
        optionsChosen: {
            fr: "Options choisies:",
            de: "Gewählte Optionen:",
            it: "Opzioni scelte:"
        },
        thankYou: {
            fr: "Merci! Votre configuration a été enregistrée.",
            de: "Danke! Ihre Konfiguration wurde gespeichert.",
            it: "Grazie! La tua configurazione è stata salvata."
        },
        emailSent: {
            fr: "Un email récapitulatif vous a été envoyé.",
            de: "Eine Zusammenfassungs-E-Mail wurde Ihnen gesendet.",
            it: "Un'email riepilogativa ti è stata inviata."
        }
    }
};

let currentLanguage = 'fr'; // Langue par défaut

// Appliquer les traductions
function applyTranslations() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = key.split('.').reduce((obj, keyPart) => obj && obj[keyPart], translations);
        const translatedText = translation ? translation[currentLanguage] : null; // Vérifie si la clé existe

        if (translatedText) {
            element.textContent = translatedText;
        } else {
            console.warn(`Translation not found for key: ${key}`); // Avertir si la traduction n'est pas trouvée
        }
    });
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
