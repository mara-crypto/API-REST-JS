const modificationService = require('../services/modificationService');

const modificationController = {
  getAllModifications: async (req, res) => {
    try {
      const modifications = await modificationService.getAllModifications();
      res.json(modifications);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des modifications' });
    }
  },

  createModification: async (req, res) => {
    try {
      const { title, price, location, image, id_bien, id_editeur, service } = req.body;
      const newModification = await modificationService.createModification({
        title,
        price,
        location,
        image,
        id_bien,
        id_editeur,
        service,
      });
      res.json(newModification);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création de la modification' });
    }
  },
};

module.exports = modificationController;
