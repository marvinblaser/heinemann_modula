// dropdown.js - Gestion des accordéons
document.addEventListener('DOMContentLoaded', function() {
    initAccordions();
});

function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach((header, index) => {
        console.log(`Initialisation de l'accordéon ${index + 1}`); // Débogage

        header.addEventListener('click', function() {
            const content = this.nextElementSibling;

            // Toggle l'état actif
            this.classList.toggle('active');
            content.classList.toggle('active');
            // Ajuster la hauteur max
            if (this.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0';
            }
        });
    });
}
