//Pour avoir des tokens uniques
const jwt = require("jsonwebtoken");

// Verification authentification 
module.exports = (req, res, next) => {
  try {
    //On obtient le token dans le header auth et on récupère le dernier element
    const token = req.headers.authorization.split(" ")[1];
    //On vérifie le token
    const decodedToken = jwt.verify(token, "random");
    
    const userId = decodedToken.userId;
    //On récupère l'userID
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch (e) {
    //Erreur d'authentification
    res.status(401).json({ error: "Unauthorized" });
  }
};