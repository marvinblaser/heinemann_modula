const EMAIL_SERVICE_ID = 'service_pff2cmo';
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

    const templateParams = {
        to_name: `${firstname} ${name}`,
        to_email: email,
        machine_model: 'MODULA L',
        selected_color: selectedColor,
        selected_options: selectedOptions,
        date: new Date().toLocaleDateString(),
        language: selectedLanguage // Ajout de la langue sélectionnée
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
