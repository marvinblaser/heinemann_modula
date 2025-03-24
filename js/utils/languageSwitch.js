// formValidation.js - Validation des formulaires
document.addEventListener("DOMContentLoaded", function () {
  initFormValidation();
});

function initFormValidation() {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      // Pour les formulaires traités en JS, empêcher l'envoi par défaut
      if (form.getAttribute("data-js-submit") === "true") {
        e.preventDefault();
      }
      if (!validateForm(form)) {
        e.preventDefault();
      } else {
        // Ici, vous pouvez procéder à la soumission réelle (ex. AJAX)
        console.log("Formulaire validé !");
      }
    });

    const inputs = form.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        validateInput(this);
      });

      input.addEventListener("input", function () {
        if (this.classList.contains("invalid")) {
          this.classList.remove("invalid");
          const errorMessage = this.nextElementSibling;
          if (
            errorMessage &&
            errorMessage.classList.contains("error-message")
          ) {
            errorMessage.remove();
          }
        }
      });
    });
  });
}

function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll("input, select, textarea");

  inputs.forEach((input) => {
    if (!validateInput(input)) {
      isValid = false;
    }
  });

  return isValid;
}

function validateInput(input) {
  if (input.disabled || input.readOnly) {
    return true;
  }

  let isValid = true;
  let errorMessage = "";

  const existingError = input.nextElementSibling;
  if (
    existingError &&
    existingError.classList.contains("error-message")
  ) {
    existingError.remove();
  }

  if (input.hasAttribute("required") && !input.value.trim()) {
    isValid = false;
    errorMessage = "Ce champ est requis";
  } else if (
    input.type === "email" &&
    input.value.trim() &&
    !validateEmail(input.value)
  ) {
    isValid = false;
    errorMessage = "Veuillez entrer une adresse email valide";
  } else if (input.hasAttribute("pattern") && input.value.trim()) {
    const pattern = new RegExp(input.getAttribute("pattern"));
    if (!pattern.test(input.value)) {
      isValid = false;
      errorMessage = input.title || "Format invalide";
    }
  } else if (
    input.hasAttribute("minlength") &&
    input.value.length < parseInt(input.getAttribute("minlength"))
  ) {
    isValid = false;
    errorMessage = `Minimum ${input.getAttribute("minlength")} caractères requis`;
  }

  if (!isValid) {
    input.classList.add("invalid");
    const errorElement = document.createElement("div");
    errorElement.classList.add("error-message");
    errorElement.textContent = errorMessage;
    input.insertAdjacentElement("afterend", errorElement);
  } else {
    input.classList.remove("invalid");
  }

  return isValid;
}

function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
}

document.addEventListener("DOMContentLoaded", function () {
  // Popup Options
  const optionsModal = document.getElementById("optionsModal");
  const validateOptionsBtn = document.getElementById("validateOptions");
  const closeOptionsBtn = document.getElementById("closeOptions");

  // Popup Coordonnées
  const coordinatesModal = document.getElementById("coordinatesModal");
  const closeCoordinatesBtn = document.getElementById("closeCoordinates");

  // Lors du clic sur "Valider mes options"
  validateOptionsBtn.addEventListener("click", function () {
    // Récupérer les options cochées (pour traitement ou stockage)
    const checkedOptions = document.querySelectorAll(
      ".checkbox-container input[type='checkbox']:checked"
    );
    const selectedOptions = Array.from(checkedOptions).map(
      (checkbox) =>
        checkbox.closest(".checkbox-container").querySelector(".label")
          .textContent
    );
    console.log("Options sélectionnées :", selectedOptions);
    // Fermer le popup des options
    optionsModal.classList.remove("active");
    // Afficher le popup des coordonnées
    coordinatesModal.classList.add("active");
  });

  // Fermer le popup Options si besoin
  if (closeOptionsBtn) {
    closeOptionsBtn.addEventListener("click", function () {
      optionsModal.classList.remove("active");
    });
  }

  // Fermer le popup Coordonnées
  if (closeCoordinatesBtn) {
    closeCoordinatesBtn.addEventListener("click", function () {
      coordinatesModal.classList.remove("active");
    });
  }
});