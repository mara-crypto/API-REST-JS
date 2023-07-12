const electroniqueService = require('../services/electroniqueService');

// Fonction pour obtenir tous les produits électroniques
const getAllElectroniques = async (req, res) => {
  try {
    const electroniques = await electroniqueService.getAllElectroniques();
    res.json(electroniques);
  } catch (error) {
    res.status(500).json({ error: "Une erreur est survenue lors de la récupération des produits électroniques." });
  }
};

const getElectroniqueById = async (req, res) => {
  try {
    const { id } = req.params;
    const electroniqueById = await electroniqueService.getElectroniqueById(id);
    if (!electroniqueById) {
      return res.status(404).json({ error: "Produit électronique non trouvé." });
    }
    res.json(electroniqueById);
  } catch (error) {
    res.status(500).json({ error: "Une erreur est survenue lors de la récupération du produit électronique." });
  }
};

const postNewElectronique = async (req, res) => {
  try {
    const { title, price, location, image } = req.body;
    const electroniqueNew = await electroniqueService.postNewElectronique(title, price, location, image);
    res.status(201).json({ message: "Produit électronique ajouté avec succès.", electroniqueNew });
  } catch (error) {
    res.status(400).json({ error: "Données invalides pour créer un nouveau produit électronique." });
  }
};

const putElectronique = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, location, image } = req.body;
    const electroniquePut = await electroniqueService.putElectronique(title, price, location, image, id);
    if (!electroniquePut) {
      return res.status(404).json({ error: "Produit électronique non trouvé." });
    }
    res.status(200).json({ message: "Produit électronique mis à jour avec succès.", electroniquePut });
  } catch (error) {
    res.status(400).json({ error: "Données invalides pour mettre à jour le produit électronique." });
  }
};

const deleteElectronique = async (req, res) => {
  try {
    const { id } = req.params;
    const electroniqueDelete = await electroniqueService.deleteElectronique(id);
    if (!electroniqueDelete) {
      return res.status(404).json({ error: "Produit électronique non trouvé." });
    }
    res.status(200).json({ message: "Produit électronique supprimé avec succès.", electroniqueDelete });
  } catch (error) {
    res.status(500).json({ error: "Une erreur est survenue lors de la suppression du produit électronique." });
  }
};

module.exports = {
  getAllElectroniques,
  getElectroniqueById,
  postNewElectronique,
  putElectronique,
  deleteElectronique
};
