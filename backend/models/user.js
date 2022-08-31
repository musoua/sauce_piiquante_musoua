const mongoose = require('mongoose');

//pour sécuriser les emails
const uniqueValidator = require('mongoose-unique-validator');

// Schema User 
const userSchema = mongoose.Schema({
    // ajout d'une configuration pour qu'on ne puisse pas s'inscrire plusieurs fois avec la même adresse mail
   email : {type: String, required: true, unique : true},
   password: { type: String, required: true }

});

// Verification email unique 
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);