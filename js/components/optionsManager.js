// optionsManager.js - Gestion des options et checkboxes
document.addEventListener('DOMContentLoaded', function() {
    initOptionsManager();
  });
  
  function initOptionsManager() {
    const checkboxContainers = document.querySelectorAll('.checkbox-container');
    const saveConfigBtn = document.querySelector('.save-config-btn');
    
    if (!checkboxContainers.length) return;
    
    // Créer des éléments checkbox personnalisés si nécessaire
    checkboxContainers.forEach(container => {
      const input = container.querySelector('input[type="checkbox"]');
      
      if (!input) return;
      
      // Vérifier si la div checkbox existe déjà
      if (!container.querySelector('.checkbox')) {
        // Créer l'élément checkbox personnalisé
        const checkbox = document.createElement('div');
        checkbox.classList.add('checkbox');
        
        // Insérer après l'input
        input.insertAdjacentElement('afterend', checkbox);
      }
      
      // Ajouter un texte de libellé si nécessaire
      if (!container.querySelector('.label')) {
        const label = document.createElement('div');
        label.classList.add('label');
        label.textContent = input.getAttribute('data-label') || 'Option';
        container.appendChild(label);
      }
      
      // Gérer le clic sur le conteneur pour activer/désactiver la checkbox
      container.addEventListener('click', function(e) {
        // Éviter de déclencher si le clic est directement sur l'input
        if (e.target !== input) {
          input.checked = !input.checked;
          
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
  