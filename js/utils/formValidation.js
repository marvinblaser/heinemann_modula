// formValidation.js - Validation des formulaires
document.addEventListener('DOMContentLoaded', function() {
  initFormValidation();
});

function initFormValidation() {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
      // Gérer la soumission du formulaire
      form.addEventListener('submit', function(e) {
          // Empêcher la soumission par défaut pour les formulaires qui seront traités par JS
          if (form.getAttribute('data-js-submit') === 'true') {
              e.preventDefault();
          }

          // Valider le formulaire
          if (!validateForm(form)) {
              e.preventDefault();
          }
      });

      // Validation en temps réel (optionnel)
      const inputs = form.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
          input.addEventListener('blur', function() {
              validateInput(this);
          });

          input.addEventListener('input', function() {
              // Enlever les messages d'erreur quand l'utilisateur tape
              if (this.classList.contains('invalid')) {
                  this.classList.remove('invalid');
                  const errorMessage = this.nextElementSibling;
                  if (errorMessage && errorMessage.classList.contains('error-message')) {
                      errorMessage.remove();
                  }
              }
          });
      });
  });

  // Validation spécifique pour le formulaire de configuration
  const userInfoForm = document.getElementById('userInfoForm');
  const nextBtn = document.querySelector('.next-btn');

  if (userInfoForm && nextBtn) {
      nextBtn.addEventListener('click', function(e) {
          e.preventDefault();
          if (validateForm(userInfoForm)) {
              // Passer à l'étape suivante du formulaire
              const step1 = document.getElementById('modalStep1');
              const step2 = document.getElementById('modalStep2');

              if (step1 && step2) {
                  step1.classList.remove('active');
                  step2.classList.add('active');

                  // Mettre à jour la récapitulation
                  updateRecapitulation();
              }
          }
      });
  }
}

// Valider un formulaire entier
function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('input, select, textarea');

  inputs.forEach(input => {
      if (!validateInput(input)) {
          isValid = false;
      }
  });

  return isValid;
}

// Valider un champ individuel
function validateInput(input) {
  // Ignorer les champs désactivés ou en lecture seule
  if (input.disabled || input.readOnly) {
      return true;
  }

  let isValid = true;
  let errorMessage = '';

  // Supprimer les messages d'erreur existants
  const existingError = input.nextElementSibling;
  if (existingError && existingError.classList.contains('error-message')) {
      existingError.remove();
  }

  // Valider selon les attributs HTML5
  if (input.hasAttribute('required') && !input.value.trim()) {
      isValid = false;
      errorMessage = 'Ce champ est requis';
  } else if (input.type === 'email' && input.value.trim() && !validateEmail(input.value)) {
      isValid = false;
      errorMessage = 'Veuillez entrer une adresse email valide';
  } else if (input.hasAttribute('pattern') && input.value.trim()) {
      const pattern = new RegExp(input.getAttribute('pattern'));
      if (!pattern.test(input.value)) {
          isValid = false;
          errorMessage = input.title || 'Format invalide';
      }
  } else if (input.hasAttribute('minlength') && input.value.length < parseInt(input.getAttribute('minlength'))) {
      isValid = false;
      errorMessage = `Minimum ${input.getAttribute('minlength')} caractères requis`;
  }

  // Ajouter une classe d'erreur et un message si nécessaire
  if (!isValid) {
      input.classList.add('invalid');

      // Créer un élément de message d'erreur
      const errorElement = document.createElement('div');
      errorElement.classList.add('error-message');
      errorElement.textContent = errorMessage;

      // Insérer après l'input
      input.insertAdjacentElement('afterend', errorElement);
  } else {
      input.classList.remove('invalid');
  }

  return isValid;
}

// Fonction de validation d'email
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
}

// Mettre à jour la récapitulation avant confirmation
function updateRecapitulation() {
  const selectedColor = document.getElementById('selectedColor');
  const selectedOptions = document.getElementById('selectedOptions');

  if (!selectedColor || !selectedOptions) return;

  // Récupérer la couleur active
  const activeColorOption = document.querySelector('.color-option.active');
  if (activeColorOption) {
      // Extraire le nom de la couleur depuis la classe CSS
      const colorClass = Array.from(activeColorOption.classList)
          .find(cls => cls.startsWith('color-'));

      // Mapper la classe CSS vers un nom lisible
      const colorMap = {
          'color-ral1001': 'RAL1001',
          'color-ral1013': 'RAL1013',
          'color-ral1028': 'RAL1028',
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

      selectedColor.textContent = colorMap[colorClass] || 'Non spécifiée';

      // Créer un carré de couleur
      const colorSquare = document.createElement('span');
      colorSquare.style.display = 'inline-block';
      colorSquare.style.width = '20px';
      colorSquare.style.height = '20px';
      colorSquare.style.backgroundColor = getColorFromClass(colorClass); // Utiliser une fonction pour obtenir la couleur
      colorSquare.style.marginLeft = '10px';
      colorSquare.style.border = '1px solid #000'; // Optionnel : ajouter une bordure pour le rendre plus visible
      selectedColor.appendChild(colorSquare);
  }

  // Vider la liste des options
  selectedOptions.innerHTML = '';

  // Récupérer les options sélectionnées
  const checkedOptions = document.querySelectorAll('.checkbox-container input[type="checkbox"]:checked');
  checkedOptions.forEach(option => {
      const label = option.closest('.checkbox-container').querySelector('.label').textContent;
      const listItem = document.createElement('li');
      listItem.textContent = label;
      selectedOptions.appendChild(listItem);
  });
}

// Fonction pour obtenir la couleur à partir de la classe
function getColorFromClass(colorClass) {
  const colorMap = {
      'color-ral1001': '#C69C6D',
      'color-ral1013': '#EAE8D2',
      'color-ral1024': '#DDAA00',
      'color-ral1028': '#FFB400',
      'color-ral3004': '#6A2C2D',
      'color-ral3020': '#C72C3B',
      'color-ral5003': '#1D1F2A',
      'color-ral5010': '#003B5C',
      'color-ral5014': '#A4B8C4',
      'color-ral5017': '#0072B8',
      'color-ral5018': '#009B9F',
      'color-ral5024': '#009B9F',
      'color-ral6029': '#2B4D3A',
      'color-ral6034': '#D68A8A',
      'color-ral7011': '#4E5452',
      'color-ral7016': '#3B3B3B',
      'color-ral7032': '#B7B7B7',
      'color-ral7035': '#D7D7D7',
      'color-ral7044': '#B7B7B7',
      'color-ral7045': '#A7A8A6',
      'color-ral9010': '#FFFFFF',
      'color-ral9016': '#F4F4F4'
  };
  return colorMap[colorClass] || '#FFFFFF'; // Valeur par défaut si la classe n'est pas trouvée
}
