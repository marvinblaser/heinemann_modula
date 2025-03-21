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


        console.log('Nom:', name);
console.log('Prénom:', firstname);
console.log('Email:', email);
console.log('Couleur sélectionnée:', selectedColor);
console.log('Options sélectionnées:', selectedOptions);

    const templateParams = {
        to_name: `${firstname} ${name}`,
        to_email: email,
        machine_model: 'MODULA L',
        selected_color: selectedColor,
        selected_options: selectedOptions,
        date: new Date().toLocaleDateString()
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

function completeEmailSending(success) {
    const loadingSpinner = document.querySelector('.loading-spinner');
    if (loadingSpinner) {
        loadingSpinner.classList.add('hide');
    }

    if (success) {
        const step2 = document.getElementById('modalStep2');
        const step3 = document.getElementById('modalStep3');

        if (step2 && step3) {
            step2.classList.remove('active');
            step3.classList.add('active');
        }
    } else {
        alert('Une erreur est survenue lors de l\'envoi de l\'email. Veuillez réessayer.');
    }
}
