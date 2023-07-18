const electromenagerService = require('../services/electromenagerService'); // Importation du service electromenager

const electromenagerController = {
  // Récupérer tous les électroménagers
  async getAll(req, res) {
    try {
      const electromenagers = await electromenagerService.getAll();
      res.json(electromenagers);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des données d\'électroménagers' });
    }
  },

  // Créer un nouvau électroménager
  async create(req, res) {
    try {
      const data = req.body;
      const electromenager = await electromenagerService.create(data);
      res.status(201).json(electromenager);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création de l\'électroménager' });
    }
  },

  // Récupérer un électroménager par son ID
  async getById(req, res) {
    try {
      const id = req.params.id;
      const electromenager = await electromenagerService.getById(id);
      res.json(electromenager);
    } catch (error) {
      res.status(404).json({ error: 'Aucun électroménager trouvé avec cet ID' });
    }
  },

  // Mettre à jour un électroménager existant
  async update(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      const electromenager = await electromenagerService.update(id, data);
      res.json(electromenager);
    } catch (error) {
      res.status(404).json({ error: 'Aucun électroménager trouvé avec cet ID' });
    }
  },

  // Supprimer un électroménager
  async delete(req, res) {
    try {
      const id = req.params.id;
      const electromenager = await electromenagerService.delete(id);
      res.json(electromenager);
    } catch (error) {
      res.status(404).json({ error: 'Aucun électroménager trouvé avec cet ID' });
    }
  }
};

module.exports = electromenagerController; // Exportation du contrôleur pour être utilisé dans d'autres fichiers
