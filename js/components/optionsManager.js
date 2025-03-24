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

            // if (checkedOptions.length === 0) {
            //     alert('Veuillez sélectionner au moins une option.');
            //     return;
            // }

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
    const closeButton = document.querySelector('.close-btn');
    const nextBtn = document.querySelector('.next-btn');
    const backBtn = document.querySelector('.back-btn');

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const step1 = document.getElementById('modalStep1');
            const step2 = document.getElementById('modalStep2');

            if (step1 && step2) {
                step1.classList.remove('active');
                step2.classList.add('active');
                updateRecapitulation(); // Mettre à jour le récapitulatif
            }
        });
    }

    if (backBtn) {
        backBtn.addEventListener('click', function() {
            const step1 = document.getElementById('modalStep1');
            const step2 = document.getElementById('modalStep2');

            if (step1 && step2) {
                step2.classList.remove('active');
                step1.classList.add('active');
            }
        });
    }
});

// Fonction pour fermer le modal et réinitialiser les étapes
function closeModal() {
    const configModal = document.getElementById('configModal');
    if (configModal) {
        configModal.classList.remove('active');
        resetModal(); // Réinitialiser le modal
    }
}

// Fonction pour réinitialiser le modal
function resetModal() {
    const step1 = document.getElementById('modalStep1');
    const step2 = document.getElementById('modalStep2');
    const step3 = document.getElementById('modalStep3');

    if (step1) {
        step1.classList.add('active');
    }
    if (step2) {
        step2.classList.remove('active');
    }
    if (step3) {
        step3.classList.remove('active');
    }

    // Réinitialiser le formulaire
    document.getElementById('userInfoForm').reset();
    document.getElementById('selectedColor').textContent = ''; // Réinitialiser la couleur choisie
    document.getElementById('selectedOptions').innerHTML = ''; // Réinitialiser les options choisies
}
