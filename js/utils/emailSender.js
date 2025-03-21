// emailSender.js - Gestion de l'envoi d'emails avec Node.js

document.addEventListener('DOMContentLoaded', function() {
  const sendEmailBtn = document.getElementById('sendEmailBtn');
  
  sendEmailBtn.addEventListener('click', function() {
      // Collecter les données du formulaire
      const name = document.getElementById('name').value.trim();
      const firstname = document.getElementById('firstname').value.trim();
      const email = document.getElementById('email').value.trim();
      
      // Vérifiez que l'email n'est pas vide
      if (!email) {
          alert('Veuillez entrer une adresse email.');
          return;
      }

      // Récupérer la couleur sélectionnée
      const selectedColorElement = document.getElementById('selectedColor');
      const selectedColor = selectedColorElement ? selectedColorElement.value : '';

      // Récupérer les options sélectionnées
      const selectedOptionsElement = document.getElementById('selectedOptions');
      const selectedOptions = selectedOptionsElement ? selectedOptionsElement.value : '';

      // Préparer les données à envoyer
      const data = {
          name: name,
          firstname: firstname,
          email: email,
          selectedColor: selectedColor,
          selectedOptions: selectedOptions
      };

      // Afficher un message de chargement
      const loadingMessage = document.createElement('div');
      loadingMessage.textContent = 'Envoi en cours...';
      document.body.appendChild(loadingMessage);

      // Envoyer les données au serveur
      fetch('http://localhost:3000/send-email', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then(response => {
          if (response.ok) {
              loadingMessage.textContent = 'Merci! Votre message a été envoyé.';
              document.getElementById('userInfoForm').reset(); // Réinitialiser le formulaire
          } else {
              loadingMessage.textContent = 'Une erreur est survenue. Veuillez réessayer.';
          }
      })
      .catch(error => {
          loadingMessage.textContent = 'Une erreur est survenue. Veuillez réessayer.';
          console.error('Erreur:', error);
      });
  });
});
