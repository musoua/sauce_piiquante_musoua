// Récupération des images stockées sur le serveur
const multer = require('multer');

//On choisit les extentions possibles suivant le fichier
const MIME_TYPES = {
  'image/jpg': '.jpg',
  'image/jpeg': '.jpeg',
  'image/png': '.png'
};

// Définition du local de stockage avec destination et nom du dossier
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  // Définition du nom du fichier image
  filename: (req, file, callback) => {
    // On crée l'extension fichier
    const extension = MIME_TYPES[file.mimetype];
    const name = file.originalname.split(extension).join('_');
    // Callback du nom du fichier final
    callback(null, name + Date.now() + extension);
  }
});

module.exports = multer({storage: storage}).single('image');