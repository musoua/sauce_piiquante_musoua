const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");
const path = require("path");

const app = express();




// Connexion à la base de données

mongoose.connect('mongodb+srv://musoua:Abcd123@musoua-piiquante.3bpgupx.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


// Mise en place reponses headers Pour empêcher les erreurs de CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());

// Routes d'API
app.use("/api/auth",userRoutes);
app.use("/api/sauces",sauceRoutes);
app.use("/images",express.static(path.join(__dirname,"images"))); //chemin statique images

module.exports = app;