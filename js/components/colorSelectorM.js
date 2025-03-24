// colorSelector.js - Gestion du sélecteur de couleurs
document.addEventListener('DOMContentLoaded', function() {
    initColorSelector();
});

function initColorSelector() {
    const colorOptions = document.querySelectorAll('.color-option');
    const machineImage = document.querySelector('#machineImage');

    if (!colorOptions.length || !machineImage) return;

    // Définir les chemins d'images pour chaque couleur
    const colorImagePaths = {
        "color-ral1001": "assets/img/machines/modula-m/RAL1001.jpg",
        "color-ral1013": "assets/img/machines/modula-m/RAL1013.jpg",
        "color-ral1028": "assets/img/machines/modula-m/RAL1028.jpg",
        "color-ral3004": "assets/img/machines/modula-m/RAL3004.jpg",
        "color-ral3020": "assets/img/machines/modula-m/RAL3020.jpg",
        "color-ral5003": "assets/img/machines/modula-m/RAL5003.jpg",
        "color-ral5010": "assets/img/machines/modula-m/RAL5010.jpg",
        "color-ral5014": "assets/img/machines/modula-m/RAL5014.jpg",
        "color-ral5017": "assets/img/machines/modula-m/RAL5017.jpg",
        "color-ral5018": "assets/img/machines/modula-m/RAL5018.jpg",
        "color-ral5024": "assets/img/machines/modula-m/RAL5024.jpg",
        "color-ral6029": "assets/img/machines/modula-m/RAL6029.jpg",
        "color-ral6034": "assets/img/machines/modula-m/RAL6034.jpg",
        "color-ral7011": "assets/img/machines/modula-m/RAL7011.jpg",
        "color-ral7016": "assets/img/machines/modula-m/RAL7016.jpg",
        "color-ral7032": "assets/img/machines/modula-m/RAL7032.jpg",
        "color-ral7035": "assets/img/machines/modula-m/RAL7035.jpg",
        "color-ral7044": "assets/img/machines/modula-m/RAL7044.jpg",
        "color-ral7045": "assets/img/machines/modula-m/RAL7045.jpg",
        "color-ral9010": "assets/img/machines/modula-m/RAL9010.jpg",
        "color-ral9016": "assets/img/machines/modula-m/RAL9010.jpg"
    };

    // Ajouter les écouteurs d'événements
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Retirer la classe active de toutes les options
            colorOptions.forEach(opt => opt.classList.remove('active'));

            // Ajouter la classe active à l'option cliquée
            this.classList.add('active');

            // Trouver la classe de couleur
            const colorClasses = this.className.split(' ');
            const colorClass = colorClasses.find(cls => cls.startsWith('color-'));

            // Changer l'image si un chemin est défini pour cette couleur
            if (colorClass && colorImagePaths[colorClass]) {
                // Afficher l'écran de chargement
                machineImage.style.opacity = '0.5';

                // Changer l'image après un délai
                setTimeout(() => {
                    machineImage.src = colorImagePaths[colorClass];
                    machineImage.onload = () => {
                        machineImage.style.opacity = '1';
                    };
                }, 200);
            }

            // Stocker la sélection pour la récapitulation
            sessionStorage.setItem('selectedColor', colorClass);

            // Pour le débogage
            console.log(`Couleur sélectionnée: ${colorClass}`);
        });
    });
}
