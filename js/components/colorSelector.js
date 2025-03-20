// colorSelector.js - Gestion du sélecteur de couleurs
document.addEventListener("DOMContentLoaded", function () {
  initColorSelector();
});

function initColorSelector() {
  const colorOptions = document.querySelectorAll(".color-option");
  const machineImage = document.querySelector("#machineImage");

  if (!colorOptions.length || !machineImage) return;

  // Définir les chemins d'images pour chaque couleur
  const colorImagePaths = {
    "color-ral1001": "RAL1001",
    "color-ral1013": "RAL1013",
    "color-ral1024": "RAL1028",
    "color-ral3004": "RAL3004",
    "color-ral3020": "RAL3020",
    "color-ral5003": "RAL5003",
    "color-ral5010": "RAL5010",
    "color-ral5014": "RAL5014",
    "color-ral5017": "RAL5017",
    "color-ral5018": "RAL5018",
    "color-ral5024": "RAL5024",
    "color-ral6029": "RAL6029",
    "color-ral6034": "RAL6034",
    "color-ral7011": "RAL7011",
    "color-ral7016": "RAL7016",
    "color-ral7032": "RAL7032",
    "color-ral7035": "RAL7035",
    "color-ral7044": "RAL7044",
    "color-ral7045": "RAL7045",
    "color-ral9006": "RAL9006",
    "color-ral9010": "RAL9010",
    "color-ral9016": "RAL9016",
  };

  // Précharger les images (optionnel, améliore l'expérience utilisateur)
  preloadImages(Object.values(colorImagePaths));

  // Couleur par défaut (remplacez par la couleur que vous souhaitez activer par défaut)
  let defaultColor = "color-white";

  // Définir l'état actif par défaut
  colorOptions.forEach((option) => {
    const colorClasses = option.className.split(" ");
    const colorClass = colorClasses.find((cls) => cls.startsWith("color-"));

    if (colorClass === defaultColor) {
      option.classList.add("active");
      // Définir l'image par défaut si nécessaire
      if (colorImagePaths[colorClass]) {
        machineImage.src = colorImagePaths[colorClass];
      }
    }
  });

  // Ajouter les écouteurs d'événements
  colorOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // Retirer la classe active de toutes les options
      colorOptions.forEach((opt) => opt.classList.remove("active"));

      // Ajouter la classe active à l'option cliquée
      this.classList.add("active");

      // Trouver la classe de couleur
      const colorClasses = this.className.split(" ");
      const colorClass = colorClasses.find((cls) => cls.startsWith("color-"));

      // Changer l'image si un chemin est défini pour cette couleur
      if (colorClass && colorImagePaths[colorClass]) {
        // Option avec animation de fondu
        machineImage.style.opacity = "0.5";
        setTimeout(() => {
          machineImage.src = colorImagePaths[colorClass];
          machineImage.onload = () => {
            machineImage.style.opacity = "1";
          };
        }, 200);
      }

      // Stocker la sélection pour la récapitulation
      sessionStorage.setItem("selectedColor", colorClass);

      // Pour le débogage
      console.log(`Couleur sélectionnée: ${colorClass}`);
    });
  });
}

// Fonction de préchargement d'images
function preloadImages(urls) {
  urls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}
