emailjs.init("atUIFstP0TCmRcmjx");
const EMAIL_SERVICE_ID = 'service_1g0zipm';
const EMAIL_TEMPLATE_ID = 'template_50exznp'; 

document.addEventListener('DOMContentLoaded', function() {
    const confirmBtn = document.querySelector('.confirm-btn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', sendConfigurationEmail);
    }
});

function sendConfigurationEmail() {
    const loadingSpinner = document.querySelector('.loading-spinner');
    if (loadingSpinner) {
        loadingSpinner.classList.remove('hide');
    }

    const name = document.getElementById('name').value.trim();
    const firstname = document.getElementById('firstname').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!email) {
        alert('Veuillez entrer une adresse email.');
        if (loadingSpinner) loadingSpinner.classList.add('hide');
        return;
    }

    const selectedColorElement = document.getElementById('selectedColor');
    const selectedColor = selectedColorElement ? selectedColorElement.textContent : '';

    const selectedOptionsElement = document.getElementById('selectedOptions');
    const selectedOptions = selectedOptionsElement ?
        Array.from(selectedOptionsElement.querySelectorAll('li')).map(li => li.textContent).join(', ') : '';

    // Récupérer la langue sélectionnée
    const selectedLanguage = currentLanguage; // Utiliser la langue actuelle

    // Préparer le contenu de l'email en fonction de la langue
    const emailContent = prepareEmailContent(selectedLanguage, firstname, selectedColor, selectedOptions);

    const templateParams = {
        to_name: `${firstname} ${name}`,
        to_email: email,
        message: emailContent // Utiliser le contenu préparé
    };

    emailjs.send(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            completeEmailSending(true);
        }, function(error) {
            console.log('FAILED...', error);
            completeEmailSending(false);
        });
}

// Fonction pour préparer le contenu de l'email
function prepareEmailContent(language, firstname, selectedColor, selectedOptions) {
    const messages = {
        fr: {
            subject: '🎉 Votre configuration a été enregistrée !',
            greeting: `Bonjour ${firstname},\n`,
            confirmation: 'Nous confirmons que votre configuration pour le MODULA L a été enregistrée.\n',
            contact: 'Nous vous contacterons dès que possible.\n',
            thankYou: 'Merci pour votre intérêt.\n',
            seeYouSoon: 'À bientôt !\n',
            recap: 'Récapitulatif de votre commande :\n',
            colorChosen: `Couleur choisie : ${selectedColor}\n`,
            optionsChosen: `Options choisies : ${selectedOptions}\n`,
            companyInfo: `Gewerbestrasse 6, 4105 Biel-Benken\nBüro : +41 61 331 68 51\nMobile : +41 78 683 68 28\nFax : +41 61 331 68 52\ninfo@kbmed.ch`
        },
        de: {
            subject: '🎉 Ihre Konfiguration wurde gespeichert!',
            greeting: `Guten Tag ${firstname},\n`,
            confirmation: 'Wir bestätigen, dass Ihre Konfiguration für MODULA L gespeichert wurde.\n',
            contact: 'Wir werden Sie so schnell wie möglich kontaktieren.\n',
            thankYou: 'Danke für Ihr Interesse.\n',
            seeYouSoon: 'Bis bald!\n',
            recap: 'Zusammenfassung Ihrer Bestellung:\n',
            colorChosen: `Gewählte Farbe: ${selectedColor}\n`,
            optionsChosen: `Gewählte Optionen: ${selectedOptions}\n`,
            companyInfo: `Gewerbestrasse 6, 4105 Biel-Benken\nBüro : +41 61 331 68 51\nMobile : +41 78 683 68 28\nFax : +41 61 331 68 52\ninfo@kbmed.ch`
        },
        it: {
            subject: '🎉 La tua configurazione è stata salvata!',
            greeting: `Buongiorno ${firstname},\n`,
            confirmation: 'Confermiamo che la configurazione del MODULA L è stata salvata.\n',
            contact: 'Ti contatteremo il prima possibile.\n',
            thankYou: 'Grazie per il tuo interesse.\n',
            seeYouSoon: 'A presto!\n',
            recap: 'Riepilogo del tuo ordine:\n',
            colorChosen: `Colore scelto: ${selectedColor}\n`,
            optionsChosen: `Opzioni scelte: ${selectedOptions}\n`,
            companyInfo: `Gewerbestrasse 6, 4105 Biel-Benken\nBüro : +41 61 331 68 51\nMobile : +41 78 683 68 28\nFax : +41 61 331 68 52\ninfo@kbmed.ch`
        },
    };

    const msg = messages[language]; // Accéder directement à l'objet de la langue
    return `
        ${msg.subject}\n
        ${msg.greeting}
        ${msg.confirmation}
        ${msg.contact}
        ${msg.thankYou}
        ${msg.seeYouSoon}
        ${msg.recap}
        ${msg.colorChosen}
        ${msg.optionsChosen}
        ${msg.companyInfo}
    `;
}





function completeEmailSending(success) {
    const loadingSpinner = document.querySelector('.loading-spinner');
    if (loadingSpinner) {
        loadingSpinner.classList.add('hide');
    }

    const step2 = document.getElementById('modalStep2');
    const step3 = document.getElementById('modalStep3');

    if (success) {
        if (step2 && step3) {
            step2.classList.remove('active');
            step3.classList.add('active');
        }
    } else {
        alert('Une erreur est survenue lors de l\'envoi de l\'email. Veuillez réessayer.');
    }
}