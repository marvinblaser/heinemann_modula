// navigation.js - Gestion de la navigation
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
  });
  
  function initNavigation() {
    const burgerBtn = document.querySelector('.burger-btn');
    const mainNav = document.querySelector('.main-nav');
    const navItems = document.querySelectorAll('.nav-item');
    const navClose = document.querySelector('.nav-close');
    
    // Identifier la page active
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Marquer l'élément de navigation actif
    navItems.forEach(item => {
      const itemLink = item.getAttribute('href');
      if (itemLink === currentPage) {
        item.classList.add('active');
      }
    });
    
    // Gestion de l'ouverture/fermeture du menu
    if (burgerBtn && mainNav) {
      burgerBtn.addEventListener('click', function() {
        burgerBtn.classList.toggle('active');
        mainNav.classList.toggle('active');
        document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
      });
    }
    
    // Fermer le menu avec le bouton X
    if (navClose) {
      navClose.addEventListener('click', function() {
        mainNav.classList.remove('active');
        burgerBtn.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
    
    // Fermer le menu au clic sur un élément
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        mainNav.classList.remove('active');
        burgerBtn.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    
    // Fermer le menu au redimensionnement de la fenêtre
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 1024 && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        burgerBtn.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
  