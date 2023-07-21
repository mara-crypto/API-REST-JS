const bcrypt = require('bcrypt');
const userController = require('../services/userService');
const jwt = require('jsonwebtoken');
const { use } = require('../routes/electroniqueRoutes');

const login = async (req, res) => {
  try {
    const { mail, password } = req.body;
    const user = await userController.postUser(mail);

    if (user === null) {
      res.status(403).json({ message: "Paire mail / mot de passe incorrect" });
    } else {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        res.status(403).json({ message: "Paire mail / mot de passe incorrect" });
      } else {
        // Stocker les informations de session dans le token d'authentification
        const token = jwt.sign({ full_name: user.full_name, role: user.role, id_user: user.id }, 'secret-key', { expiresIn: '1h' });

        // Ajouter le token aux informations renvoyées
        res.status(200).json({ message: "Info utilisateur récupéré avec succès.", user_name: user.full_name, user_role: user.role, token: token });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur lors du traitement de la demande", error: error.message });
  }
};

module.exports = {
  login,
};