const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

// Route pour la création d'un utlisateur
router.post('/signup', userCtrl.signup);
// Route pour la connexion d'un utilisateur
router.post('/login', userCtrl.login);

module.exports = router;