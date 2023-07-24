// immobilierController.js
const immobilierService = require('../services/immobilierService');

const immobilierController = {
  async getAll(req, res) {
    try {
      const immobilier = await immobilierService.getAll();
      res.json(immobilier);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des données immobilier' });
    }
  },

  async create(req, res) {
    try {
      const data = req.body;
      const immobilier = await immobilierService.create(data);
      res.status(201).json(immobilier);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création du bien immobilier' });
    }
  },

  async getById(req, res) {
    try {
      const id = req.params.id;
      const immobilier = await immobilierService.getById(id);
      res.json(immobilier);
    } catch (error) {
      res.status(404).json({ error: 'Aucun bien immobilier trouvé avec cet ID' });
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      const immobilier = await immobilierService.update(id, data);
      res.json(immobilier);
    } catch (error) {
      res.status(404).json({ error: 'Aucun bien immobilier trouvé avec cet ID' });
    }
  },

  async delete(req, res) {
    try {
      const id = req.params.id;
      const immobilier = await immobilierService.update(id, { etat: false });
      res.json(immobilier);
    } catch (error) {
      res.status(404).json({ error: 'Aucun bien immobilier trouvé avec cet ID' });
    }
  },
};

module.exports = immobilierController;
