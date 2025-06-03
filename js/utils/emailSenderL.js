// import emailjs from '@emailjs/browser';
// emailjs.init("atUIFstP0TCmRcmjx");
// const EMAIL_SERVICE_ID = 'service_1g0zipm';
// const EMAIL_TEMPLATE_ID = 'template_50exznp'; 

// document.addEventListener('DOMContentLoaded', function() {
//     const confirmBtn = document.querySelector('.confirm-btn');
//     if (confirmBtn) {
//         confirmBtn.addEventListener('click', sendConfigurationEmail);
//     }
// });

// function sendConfigurationEmail() {
//     const loadingSpinner = document.querySelector('.loading-spinner');
//     if (loadingSpinner) {
//         loadingSpinner.classList.remove('hide');
//     }

//     const name = document.getElementById('name').value.trim();
//     const firstname = document.getElementById('firstname').value.trim();
//     const email = document.getElementById('email').value.trim();

//     if (!email) {
//         alert('Veuillez entrer une adresse email.');
//         if (loadingSpinner) loadingSpinner.classList.add('hide');
//         return;
//     }

//     const selectedColorElement = document.getElementById('selectedColor');
//     const selectedColor = selectedColorElement ? selectedColorElement.textContent : '';

//     const selectedOptionsElement = document.getElementById('selectedOptions');
//     const selectedOptions = selectedOptionsElement ?
//         Array.from(selectedOptionsElement.querySelectorAll('li')).map(li => li.textContent).join(', ') : '';

//     // Récupérer la langue sélectionnée
//     const selectedLanguage = currentLanguage; // Utiliser la langue actuelle

//     // Préparer le contenu de l'email en fonction de la langue
//     const emailContent = prepareEmailContent(selectedLanguage, firstname, selectedColor, selectedOptions);

//     const templateParams = {
//         to_name: `${firstname} ${name}`,
//         to_email: email,
//         message: emailContent // Utiliser le contenu préparé
//     };

//     emailjs.send(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, templateParams)
//         .then(function(response) {
//             console.log('SUCCESS!', response.status, response.text);
//             completeEmailSending(true);
//         }, function(error) {
//             console.log('FAILED...', error);
//             completeEmailSending(false);
//         });
// }

// // Fonction pour préparer le contenu de l'email
// function prepareEmailContent(language, firstname, selectedColor, selectedOptions) {
//     const messages = {
//         fr: {
//             subject: '🎉 Votre configuration a été enregistrée !',
//             greeting: `Bonjour ${firstname},\n`,
//             confirmation: 'Nous confirmons que votre configuration pour le MODULA L a été enregistrée.\n',
//             contact: 'Nous vous contacterons dès que possible.\n',
//             thankYou: 'Merci pour votre intérêt.\n',
//             seeYouSoon: 'À bientôt !\n',
//             recap: 'Récapitulatif de votre commande :\n',
//             colorChosen: `Couleur choisie : ${selectedColor}\n`,
//             optionsChosen: `Options choisies : ${selectedOptions}\n`,
//             companyInfo: `Gewerbestrasse 6, 4105 Biel-Benken\nBüro : +41 61 331 68 51\nMobile : +41 78 683 68 28\nFax : +41 61 331 68 52\ninfo@kbmed.ch`
//         },
//         de: {
//             subject: '🎉 Ihre Konfiguration wurde gespeichert!',
//             greeting: `Guten Tag ${firstname},\n`,
//             confirmation: 'Wir bestätigen, dass Ihre Konfiguration für MODULA L gespeichert wurde.\n',
//             contact: 'Wir werden Sie so schnell wie möglich kontaktieren.\n',
//             thankYou: 'Danke für Ihr Interesse.\n',
//             seeYouSoon: 'Bis bald!\n',
//             recap: 'Zusammenfassung Ihrer Bestellung:\n',
//             colorChosen: `Gewählte Farbe: ${selectedColor}\n`,
//             optionsChosen: `Gewählte Optionen: ${selectedOptions}\n`,
//             companyInfo: `Gewerbestrasse 6, 4105 Biel-Benken\nBüro : +41 61 331 68 51\nMobile : +41 78 683 68 28\nFax : +41 61 331 68 52\ninfo@kbmed.ch`
//         },
//         it: {
//             subject: '🎉 La tua configurazione è stata salvata!',
//             greeting: `Buongiorno ${firstname},\n`,
//             confirmation: 'Confermiamo che la configurazione del MODULA L è stata salvata.\n',
//             contact: 'Ti contatteremo il prima possibile.\n',
//             thankYou: 'Grazie per il tuo interesse.\n',
//             seeYouSoon: 'A presto!\n',
//             recap: 'Riepilogo del tuo ordine:\n',
//             colorChosen: `Colore scelto: ${selectedColor}\n`,
//             optionsChosen: `Opzioni scelte: ${selectedOptions}\n`,
//             companyInfo: `Gewerbestrasse 6, 4105 Biel-Benken\nBüro : +41 61 331 68 51\nMobile : +41 78 683 68 28\nFax : +41 61 331 68 52\ninfo@kbmed.ch`
//         },
//     };

//     const msg = messages[language]; // Accéder directement à l'objet de la langue
//     return `
//         ${msg.subject}\n
//         ${msg.greeting}
//         ${msg.confirmation}
//         ${msg.contact}
//         ${msg.thankYou}
//         ${msg.seeYouSoon}
//         ${msg.recap}
//         ${msg.colorChosen}
//         ${msg.optionsChosen}
//         ${msg.companyInfo}
//     `;
// }





// function completeEmailSending(success) {
//     const loadingSpinner = document.querySelector('.loading-spinner');
//     if (loadingSpinner) {
//         loadingSpinner.classList.add('hide');
//     }

//     const step2 = document.getElementById('modalStep2');
//     const step3 = document.getElementById('modalStep3');

//     if (success) {
//         if (step2 && step3) {
//             step2.classList.remove('active');
//             step3.classList.add('active');
//         }
//     } else {
//         alert('Une erreur est survenue lors de l\'envoi de l\'email. Veuillez réessayer.');
//     }
// }

import emailjs from '@emailjs/browser';

// Configuration EmailJS
const EMAILJS_CONFIG = {
    PUBLIC_KEY: "atUIFstP0TCmRcmjx",
    SERVICE_ID: 'service_1g0zipm',
    TEMPLATE_ID: 'template_50exznp'
};

// Variable pour suivre l'état d'initialisation
let isEmailJSInitialized = false;

// Fonction d'initialisation sécurisée
function initializeEmailJS() {
    try {
        if (!isEmailJSInitialized) {
            emailjs.init({
                publicKey: EMAILJS_CONFIG.PUBLIC_KEY,
                // Optionnel : limitez les requêtes
                limitRate: {
                    id: 'app',
                    throttle: 10000, // 10 secondes entre les envois
                },
            });
            isEmailJSInitialized = true;
            console.log('EmailJS initialisé avec succès');
        }
        return true;
    } catch (error) {
        console.error('Erreur d\'initialisation EmailJS:', error);
        return false;
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser EmailJS
    initializeEmailJS();
    
    // Attacher l'événement au bouton
    const confirmBtn = document.querySelector('.confirm-btn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', sendConfigurationEmail);
    }
});

// Fonction principale d'envoi d'email
async function sendConfigurationEmail() {
    const loadingSpinner = document.querySelector('.loading-spinner');
    
    try {
        // Afficher le spinner
        if (loadingSpinner) {
            loadingSpinner.classList.remove('hide');
        }

        // Vérifier l'initialisation
        if (!isEmailJSInitialized) {
            const initSuccess = initializeEmailJS();
            if (!initSuccess) {
                throw new Error('Impossible d\'initialiser EmailJS');
            }
        }

        // Récupérer et valider les données
        const formData = getFormData();
        if (!formData.isValid) {
            throw new Error(formData.error);
        }

        // Préparer les paramètres du template
        const templateParams = prepareTemplateParams(formData);
        
        console.log('Envoi en cours...', templateParams);

        // Envoyer l'email avec gestion d'erreur complète
        const response = await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            templateParams,
            EMAILJS_CONFIG.PUBLIC_KEY // Passer la clé explicitement
        );

        console.log('Email envoyé avec succès:', response);
        completeEmailSending(true);
        
    } catch (error) {
        console.error('Erreur lors de l\'envoi:', error);
        
        // Gestion spécifique des erreurs EmailJS
        let errorMessage = 'Une erreur est survenue lors de l\'envoi de l\'email.';
        
        if (error.status === 400) {
            errorMessage = 'Erreur de configuration. Vérifiez vos paramètres EmailJS.';
        } else if (error.status === 401) {
            errorMessage = 'Clé publique invalide. Vérifiez votre configuration EmailJS.';
        } else if (error.status === 404) {
            errorMessage = 'Service ou template non trouvé. Vérifiez vos IDs EmailJS.';
        } else if (error.status >= 500) {
            errorMessage = 'Erreur serveur EmailJS. Réessayez dans quelques instants.';
        }
        
        alert(errorMessage);
        completeEmailSending(false);
        
    } finally {
        // Masquer le spinner dans tous les cas
        if (loadingSpinner) {
            loadingSpinner.classList.add('hide');
        }
    }
}

// Fonction pour récupérer et valider les données du formulaire
function getFormData() {
    const name = document.getElementById('name')?.value?.trim() || '';
    const firstname = document.getElementById('firstname')?.value?.trim() || '';
    const email = document.getElementById('email')?.value?.trim() || '';

    // Validation email simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        return { isValid: false, error: 'Veuillez entrer une adresse email.' };
    }
    
    if (!emailRegex.test(email)) {
        return { isValid: false, error: 'Veuillez entrer une adresse email valide.' };
    }

    const selectedColorElement = document.getElementById('selectedColor');
    const selectedColor = selectedColorElement?.textContent?.trim() || 'Non spécifiée';

    const selectedOptionsElement = document.getElementById('selectedOptions');
    const selectedOptions = selectedOptionsElement ?
        Array.from(selectedOptionsElement.querySelectorAll('li'))
            .map(li => li.textContent.trim())
            .filter(text => text.length > 0)
            .join(', ') || 'Aucune option sélectionnée' : 'Aucune option sélectionnée';

    return {
        isValid: true,
        name,
        firstname,
        email,
        selectedColor,
        selectedOptions,
        language: typeof currentLanguage !== 'undefined' ? currentLanguage : 'fr'
    };
}

// Fonction pour préparer les paramètres du template
function prepareTemplateParams(formData) {
    const emailContent = prepareEmailContent(
        formData.language,
        formData.firstname,
        formData.selectedColor,
        formData.selectedOptions
    );

    return {
        to_name: `${formData.firstname} ${formData.name}`.trim(),
        to_email: formData.email,
        from_name: 'KBMED', // Nom de l'expéditeur
        reply_to: 'info@kbmed.ch', // Email de réponse
        subject: getEmailSubject(formData.language),
        message: emailContent
    };
}

// Fonction pour obtenir le sujet selon la langue
function getEmailSubject(language) {
    const subjects = {
        fr: '🎉 Votre configuration MODULA L a été enregistrée !',
        de: '🎉 Ihre MODULA L Konfiguration wurde gespeichert!',
        it: '🎉 La tua configurazione MODULA L è stata salvata!'
    };
    return subjects[language] || subjects.fr;
}

// Fonction pour préparer le contenu de l'email (votre fonction existante améliorée)
function prepareEmailContent(language, firstname, selectedColor, selectedOptions) {
    const messages = {
        fr: {
            greeting: `Bonjour ${firstname},`,
            confirmation: 'Nous confirmons que votre configuration pour le MODULA L a été enregistrée.',
            contact: 'Nous vous contacterons dès que possible.',
            thankYou: 'Merci pour votre intérêt.',
            seeYouSoon: 'À bientôt !',
            recap: 'Récapitulatif de votre commande :',
            colorChosen: `Couleur choisie : ${selectedColor}`,
            optionsChosen: `Options choisies : ${selectedOptions}`,
            companyInfo: `KBMED\nGewerbestrasse 6, 4105 Biel-Benken\nBüro : +41 61 331 68 51\nMobile : +41 78 683 68 28\nFax : +41 61 331 68 52\ninfo@kbmed.ch`
        },
        de: {
            greeting: `Guten Tag ${firstname},`,
            confirmation: 'Wir bestätigen, dass Ihre Konfiguration für MODULA L gespeichert wurde.',
            contact: 'Wir werden Sie so schnell wie möglich kontaktieren.',
            thankYou: 'Danke für Ihr Interesse.',
            seeYouSoon: 'Bis bald!',
            recap: 'Zusammenfassung Ihrer Bestellung:',
            colorChosen: `Gewählte Farbe: ${selectedColor}`,
            optionsChosen: `Gewählte Optionen: ${selectedOptions}`,
            companyInfo: `KBMED\nGewerbestrasse 6, 4105 Biel-Benken\nBüro : +41 61 331 68 51\nMobile : +41 78 683 68 28\nFax : +41 61 331 68 52\ninfo@kbmed.ch`
        },
        it: {
            greeting: `Buongiorno ${firstname},`,
            confirmation: 'Confermiamo che la configurazione del MODULA L è stata salvata.',
            contact: 'Ti contatteremo il prima possibile.',
            thankYou: 'Grazie per il tuo interesse.',
            seeYouSoon: 'A presto!',
            recap: 'Riepilogo del tuo ordine:',
            colorChosen: `Colore scelto: ${selectedColor}`,
            optionsChosen: `Opzioni scelte: ${selectedOptions}`,
            companyInfo: `KBMED\nGewerbestrasse 6, 4105 Biel-Benken\nBüro : +41 61 331 68 51\nMobile : +41 78 683 68 28\nFax : +41 61 331 68 52\ninfo@kbmed.ch`
        }
    };

    const msg = messages[language] || messages.fr;
    
    return `${msg.greeting}

${msg.confirmation}

${msg.contact}

${msg.thankYou}

${msg.seeYouSoon}

---

${msg.recap}

${msg.colorChosen}
${msg.optionsChosen}

---

${msg.companyInfo}`;
}

// Fonction de finalisation (votre fonction existante)
function completeEmailSending(success) {
    const step2 = document.getElementById('modalStep2');
    const step3 = document.getElementById('modalStep3');

    if (success) {
        if (step2 && step3) {
            step2.classList.remove('active');
            step3.classList.add('active');
        }
        console.log('Email envoyé avec succès !');
    } else {
        console.log('Échec de l\'envoi de l\'email');
    }
}

// Fonction de test pour vérifier la configuration
function testEmailJSConfiguration() {
    console.log('Test de configuration EmailJS...');
    console.log('Public Key:', EMAILJS_CONFIG.PUBLIC_KEY);
    console.log('Service ID:', EMAILJS_CONFIG.SERVICE_ID);
    console.log('Template ID:', EMAILJS_CONFIG.TEMPLATE_ID);
    console.log('EmailJS initialisé:', isEmailJSInitialized);
    
    // Test d'envoi avec données minimales
    const testParams = {
        to_name: 'Test User',
        to_email: 'test@example.com',
        from_name: 'KBMED',
        subject: 'Test Email',
        message: 'Ceci est un test de configuration EmailJS.'
    };
    
    console.log('Paramètres de test:', testParams);
}

// Exposer la fonction de test pour le debugging (optionnel)
window.testEmailJS = testEmailJSConfiguration;