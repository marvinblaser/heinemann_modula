// Initialisation principale du site
document.addEventListener('DOMContentLoaded', function() {
  console.log('KB MED Site loaded');
  
  // Initialiser EmailJS (si utilisé)
  // emailjs.init("atUIFstP0TCmRcmjx");
  
  // Initialisation des composants
  // initSettingsMenu();
  // initOptionsForm();
  
  // Gestion du formulaire de configuration
  setupConfigurationModal();
});


// // Initialiser le formulaire d'options
// function initOptionsForm() {
//   const checkboxes = document.querySelectorAll('.checkbox-container input[type="checkbox"]');
//   const saveConfigBtn = document.querySelector('.save-config-btn');
  
//   if (checkboxes.length && saveConfigBtn) {
//     saveConfigBtn.addEventListener('click', function() {
//       // Vérifier si au moins une option est sélectionnée
//       const hasSelectedOptions = Array.from(checkboxes).some(checkbox => checkbox.checked);
      
//       if (!hasSelectedOptions) {
//         alert('Veuillez sélectionner au moins une option.');
//         return;
//       }
      
//       // Ouvrir le modal de configuration
//       const configModal = document.getElementById('configModal');
//       if (configModal) {
//         configModal.classList.add('active');
//       }
//     });
//   }
// }

// Configuration du modal pour enregistrer une configuration
function setupConfigurationModal() {
  const configModal = document.getElementById('configModal');
  if (!configModal) return;
  
  const closeModalBtn = configModal.querySelector('.modal-close');
  const nextBtn = configModal.querySelector('.next-btn');
  const backBtn = configModal.querySelector('.back-btn');
  const confirmBtn = configModal.querySelector('.confirm-btn');
  const closeBtn = configModal.querySelector('.close-btn');
  
  const step1 = document.getElementById('modalStep1');
  const step2 = document.getElementById('modalStep2');
  const step3 = document.getElementById('modalStep3');
  
  // Fermer le modal
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', function() {
      configModal.classList.remove('active');
    });
  }
  
  // Navigation entre les étapes
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      const form = document.getElementById('userInfoForm');
      if (form.checkValidity()) {
        step1.classList.remove('active');
        step2.classList.add('active');
        updateRecapitulation();
      } else {
        form.reportValidity();
      }
    });
  }
  
  if (backBtn) {
    backBtn.addEventListener('click', function() {
      step2.classList.remove('active');
      step1.classList.add('active');
    });
  }
  
  if (confirmBtn) {
    confirmBtn.addEventListener('click', function() {
      // Simuler l'envoi d'email
      const loadingSpinner = configModal.querySelector('.loading-spinner');
      if (loadingSpinner) loadingSpinner.classList.remove('hide');
      
      // Simuler un délai d'envoi
      setTimeout(function() {
        if (loadingSpinner) loadingSpinner.classList.add('hide');
        step2.classList.remove('active');
        step3.classList.add('active');
      }, 1500);
    });
  }
  
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      configModal.classList.remove('active');
      // Réinitialiser le modal après fermeture
      setTimeout(function() {
        step3.classList.remove('active');
        step1.classList.add('active');
        document.getElementById('userInfoForm').reset();
      }, 300);
    });
  }
}

// Mettre à jour la récapitulation des options
function updateRecapitulation() {
  const selectedOptions = document.getElementById('selectedOptions');
  if (!selectedOptions) return;
  
  // Vider la liste
  selectedOptions.innerHTML = '';
  
  // Récupérer les options sélectionnées
  const checkboxes = document.querySelectorAll('.checkbox-container input[type="checkbox"]:checked');
  checkboxes.forEach(checkbox => {
    const optionLabel = checkbox.closest('.checkbox-container').querySelector('.label').textContent;
    const listItem = document.createElement('li');
    listItem.textContent = optionLabel;
    selectedOptions.appendChild(listItem);
  });
  
  // Récupérer la couleur sélectionnée
  const selectedColor = document.querySelector('.color-option.active');
  const colorDisplay = document.getElementById('selectedColor');
  
  if (selectedColor && colorDisplay) {
    // Récupérer le nom de la couleur (à adapter selon votre logique)
    let colorName = "Blanc"; // Valeur par défaut
    const colorClass = selectedColor.className.split(' ').find(cls => cls.startsWith('color-'));
    
    if (colorClass) {
      // Mapper les classes CSS vers des noms lisibles
      const colorMap = {
          'color-ral1001': 'RAL1001',
          'color-ral1013': 'RAL1013',
          'color-ral1024': 'RAL1028',
          'color-ral3004': 'RAL3004',
          'color-ral3020': 'RAL3020',
          'color-ral5003': 'RAL5003',
          'color-ral5010': 'RAL5010',
          'color-ral5014': 'RAL5014',
          'color-ral5017': 'RAL5017',
          'color-ral5018': 'RAL5018',
          'color-ral5024': 'RAL5024',
          'color-ral6029': 'RAL6029',
          'color-ral6034': 'RAL6034',
          'color-ral7011': 'RAL7011',
          'color-ral7016': 'RAL7016',
          'color-ral7032': 'RAL7032',
          'color-ral7035': 'RAL7035',
          'color-ral7044': 'RAL7044',
          'color-ral7045': 'RAL7045',
          'color-ral9010': 'RAL9010',
          'color-ral9016': 'RAL9016'
      };
      
      colorName = colorMap[colorClass] || 'Non spécifiée';
    }
    
    colorDisplay.textContent = colorName;
  }
}
