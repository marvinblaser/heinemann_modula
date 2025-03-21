// navigation.js - Gestion de la navigation
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
});

function initNavigation() {
    const burgerBtn = document.querySelector('.burger-btn');
    const mainNav = document.querySelector('.main-nav');
    const navClose = document.querySelector('.nav-close');
    const overlay = document.querySelector('.overlay');
    const settingsBtn = document.querySelector('.settings-btn');
    const settingsMenu = document.querySelector('.settings-menu');

    // Ouvrir le menu burger
    if (burgerBtn) {
        burgerBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Fermer le menu avec le bouton X
    if (navClose) {
        navClose.addEventListener('click', function() {
            mainNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Fermer le menu au clic sur l'overlay
    if (overlay) {
        overlay.addEventListener('click', function() {
            mainNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Ouvrir le menu des paramètres
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            settingsMenu.classList.toggle('active');
        });
    }

    // Fermer le menu des paramètres au clic à l'extérieur
    document.addEventListener('click', function(e) {
        if (!settingsMenu.contains(e.target) && e.target !== settingsBtn) {
            settingsMenu.classList.remove('active');
        }
    });
}