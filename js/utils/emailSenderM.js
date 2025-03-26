document.addEventListener("DOMContentLoaded", function () {
    initFormValidation();
  });

  function initFormValidation() {
    const forms = document.querySelectorAll("form");

    forms.forEach((form) => {
      form.addEventListener("submit", function (e) {
        if (form.getAttribute("data-js-submit") === "true") {
          e.preventDefault();
        }
        if (!validateForm(form)) {
          e.preventDefault();
        } else {
          console.log("Formulaire validé !");
          // Pour le formulaire des coordonnées, on passe au popup récapitulatif
          if (form.id === "userInfoForm") {
            closeCoordinatesModal();
            openSummaryModal();
          } else {
            sendConfigurationEmail();
          }
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
      errorMessage = `Minimum ${input.getAttribute(
        "minlength"
      )} caractères requis`;
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

  // ========================================================
  // Envoi de l'email via EmailJS
  // ========================================================
  const EMAIL_SERVICE_ID = "service_pff2cmo";
  const EMAIL_TEMPLATE_ID = "template_50exznp";

  function sendConfigurationEmail() {
    const loadingSpinner = document.querySelector(".loading-spinner");
    if (loadingSpinner) loadingSpinner.classList.remove("hide");

    const name = document.getElementById("name").value.trim();
    const firstname = document.getElementById("firstname").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!email) {
      alert("Veuillez entrer une adresse email.");
      if (loadingSpinner) loadingSpinner.classList.add("hide");
      return;
    }
  }