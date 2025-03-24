// optionsManager.js - Gestion des options et checkboxes
document.addEventListener('DOMContentLoaded', function() {
    initOptionsManager();
});

function initOptionsManager() {
    const checkboxContainers = document.querySelectorAll('.checkbox-container');
    const saveConfigBtn = document.querySelector('.save-config-btn');

    if (!checkboxContainers.length) return;

    // Gérer le clic sur le conteneur pour activer/désactiver la checkbox
    checkboxContainers.forEach(container => {
        const input = container.querySelector('input[type="checkbox"]');

        container.addEventListener('click', function(e) {
            // Éviter de déclencher si le clic est directement sur l'input
            input.checked = !input.checked;
            if (e.target !== input) {
                // Déclencher l'événement change pour les écouteurs éventuels
                const event = new Event('change');
                input.dispatchEvent(event);
            }
        });
    });

    // Gestion du bouton d'enregistrement de configuration
    if (saveConfigBtn) {
        saveConfigBtn.addEventListener('click', function() {
            // Vérifier si au moins une option est sélectionnée
            const checkedOptions = document.querySelectorAll('.checkbox-container input[type="checkbox"]:checked');

            if (checkedOptions.length === 0) {
                alert('Veuillez sélectionner au moins une option.');
                return;
            }

            // Stocker les options sélectionnées pour la récapitulation
            const selectedOptions = Array.from(checkedOptions).map(checkbox => {
                const label = checkbox.closest('.checkbox-container').querySelector('.label').textContent;
                return label;
            });

            sessionStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));

            // Ouvrir le modal de configuration
            const configModal = document.getElementById('configModal');
            if (configModal) {
                configModal.classList.add('active');
                // Assurez-vous que l'étape 1 est active
                const step1 = document.getElementById('modalStep1');
                if (step1) {
                    step1.classList.add('active');
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const closeModalBtn = document.querySelector('.modal-close');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            const configModal = document.getElementById('configModal');
            if (configModal) {
                configModal.classList.remove('active');
            }
        });
    }

    const closeButton = document.querySelector('.close-btn');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            const configModal = document.getElementById('configModal');
            if (configModal) {
                configModal.classList.remove('active');
            }
        });
    }
});
