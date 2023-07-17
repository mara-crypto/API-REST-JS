const bcrypt = require('bcrypt');
const userController = require('../services/userService');
const { use } = require('../routes/electroniqueRoutes');

const login = async (req, res) => {
    try {
        const { mail, password } = req.body;
        const user = await userController.postUser(mail);
        console.log(user);

        if (user === null) {
            res.status(403).json({ message: "Paire mail / mot de passe incorrect" });
          } else {
            const passwordMatch = await bcrypt.compare(password, user.password);
            console.log(passwordMatch);
            if (!passwordMatch) {
                res.status(403).json({ message: "Paire mail / mot de passe incorrect" });
            } else {
                res.status(200).json({ message: "Info utilisateur récupéré avec succès.", user_name:user.full_name, user_role: user.role });
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur lors du traitement de la demande", error: error.message });
    }
};

module.exports = {
    login,
}