const electroniqueService = require('../services/electroniqueService');

// Fonction pour obtenir tous les produits électroniques
const getAllElectroniques = async (req, res) => {
    try {
        const electroniques = await electroniqueService.getAllElectroniques();
        res.json(electroniques);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des produits électroniques.' });
    }
};



// Fonction pour récupérer un produit électronique par son identifiant
const getElectroniqueById = async (req, res) => {
    try {
        const { id } = req.params;
        const  electroniqueById = await electroniqueService.getElectroniqueById( id );
        res.json(electroniqueById);
    } catch (error) {
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération du produits électroniques."})
    }
};



// Fonction pour ajouter un nouveau produit électronique.
const postNewElectronique = async (req, res) => {
    try {
      const { title, price, location, image } = req.body;
      const electroniqueNew = await electroniqueService.postNewElectronique(title, price, location, image);
      res.status(201).json(electroniqueNew);
    } catch (error) {
      res.status(500).json({ error: "Une erreur est survenue lors de l'ajout du nouveau produit électronique." });
    }
  };
  


// Autres fonctions de contrôleur pour la création, la mise à jour et la suppression des produits électroniques

module.exports = {
  getAllElectroniques,
  getElectroniqueById,
  postNewElectronique,
  // Exportez les autres fonctions de contrôleur nécessaires
};