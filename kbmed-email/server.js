// server.js - Serveur Node.js pour envoyer des emails
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurez votre transporteur Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // ou un autre service
    auth: {
        user: 'marvinblaser.pro@gmail.com', // Votre adresse email
        pass: 'abc-OO8475iu!!' // Votre mot de passe
    }
});

// Endpoint pour envoyer l'email
app.post('/send-email', (req, res) => {
    const { name, firstname, email, selectedColor, selectedOptions } = req.body;

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Configuration de la machine',
        text: `Nom: ${name}\nPrénom: ${firstname}\nCouleur: ${selectedColor}\nOptions: ${selectedOptions}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email envoyé: ' + info.response);
    });
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
