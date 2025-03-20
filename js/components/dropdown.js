// dropdown.js - Gestion des accordéons
document.addEventListener('DOMContentLoaded', function() {
    initAccordions();
  });
  
  function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
      // Créer l'élément de flèche s'il n'existe pas
      if (!header.querySelector('.arrow')) {
        const arrow = document.createElement('span');
        arrow.classList.add('arrow');
        header.appendChild(arrow);
      }
      
      header.addEventListener('click', function() {
        const content = this.nextElementSibling;
        
        // Toggle l'état actif
        const isActive = this.classList.contains('active');
        
        // Fermer tous les autres accordéons (optionnel, pour un comportement d'accordéon)
        
        accordionHeaders.forEach(h => {
          if (h !== this) {
            h.classList.remove('active');
            h.nextElementSibling.classList.remove('active');
            h.nextElementSibling.style.maxHeight = '0';
          }
        });
        
        
        // Toggle l'accordéon cliqué
        this.classList.toggle('active');
        content.classList.toggle('active');
        
        if (!isActive) {
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          content.style.maxHeight = '0';
        }
      });
    });
    
    // Ouvrir le premier accordéon par défaut (optionnel)
    /*
    if (accordionHeaders.length > 0) {
      const firstHeader = accordionHeaders[0];
      const firstContent = firstHeader.nextElementSibling;
      
      firstHeader.classList.add('active');
      firstContent.classList.add('active');
      firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
    }
    */
  }
  