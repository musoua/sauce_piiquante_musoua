const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//On sécurise le mdp en le hachant avec bcrypt

/* Fonction d'inscription */
exports.signup = (req, res, next) => {
  const {
    email,
    password
  } = req.body;

  // Hashage du mot de passe utilisateur
  bcrypt.hash(password, 10).then((hash) => {


    const user = new User({
      email: req.body.mail,
      password: hash
    });
    // Creation de l'utilisateur et ajout dans la base de données
    user.save();

    return res.status(201).json({
      email,
      password: hash
    });
  });
};

/* Fonction de connexion */
exports.login = (req, res, next) => {
  const {
    email,
    password
  } = req.body;
  // Verification utilisateur existant
  User.findOne({
      email
    })
    .then((user) => {
      console.log(user);
      // Verification mot de passe utilisateur
      bcrypt.compare(password, user.password)
        .then((valid) => {

          //Si accepté,On donne un token en choisissant son expiration
          return res.status(201).json({
            message: "Connecté",
            userId: user._id,
            token: jwt.sign({
              userId: user._id
            }, "random", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((err) => res.status(401).json({
          message: "Unauthorized",
          err
        }));
    })
    .catch(() => res.status(404).send("Not found"));

};