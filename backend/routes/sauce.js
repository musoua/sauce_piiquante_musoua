const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sauceCtrl = require('../controllers/sauce');

//CRUD 

// Route pour la création d'une sauce
router.post('/', auth, multer, sauceCtrl.createSauce);
// Route pour l'affichage d'une seule sauce
router.get('/:id', auth, sauceCtrl.getOneSauce);
// Route pour l'affihage de toutes les sauces
router.get('/', auth, sauceCtrl.getAllSauce);
// Route pour la modification d'une sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
// Route pour la suppression d'une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);
// Route pour la gestion les "likes/dislikes"
router.post('/:id/like', auth, sauceCtrl.likeSauce);

module.exports = router;