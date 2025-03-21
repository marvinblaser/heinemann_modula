document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userInfoForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche le rechargement de la page

        // Récupérer la couleur sélectionnée
        const selectedColorElement = document.getElementById('selectedColor');
        const activeColorOption = document.querySelector('.color-option.active');
        const selectedColor = activeColorOption ? activeColorOption.className.split(' ').find(cls => cls.startsWith('color-')).replace('color-', '') : 'Non spécifiée';
        selectedColorElement.value = selectedColor; // Remplir le champ caché

        // Récupérer les options sélectionnées
        const selectedOptionsElement = document.getElementById('selectedOptions');
        const checkedOptions = document.querySelectorAll('.checkbox-container input[type="checkbox"]:checked');
        const selectedOptions = Array.from(checkedOptions).map(checkbox => {
            return checkbox.closest('.checkbox-container').querySelector('.label').textContent;
        }).join(', ');
        selectedOptionsElement.value = selectedOptions; // Remplir le champ caché

        // Afficher un message de chargement ou de confirmation
        const loadingMessage = document.createElement('div');
        loadingMessage.textContent = 'Envoi en cours...';
        document.body.appendChild(loadingMessage);

        // Envoyer le formulaire
        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                loadingMessage.textContent = 'Merci! Votre message a été envoyé.';
                form.reset(); // Réinitialiser le formulaire
            } else {
                loadingMessage.textContent = 'Une erreur est survenue. Veuillez réessayer.';
            }
        })
        .catch(error => {
            loadingMessage.textContent = 'Une erreur est survenue. Veuillez réessayer.';
            console.error('Erreur:', error);
        });
    });
});
