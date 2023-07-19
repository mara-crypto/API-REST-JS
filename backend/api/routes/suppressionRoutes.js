const express = require('express');
const suppressionService = require('../services/suppressionService');

const router = express.Router();

// Endpoint pour récupérer toutes les demandes de suppression
router.get('/', async (req, res) => {
  try {
    const suppressions = await suppressionService.getAll();
    res.json(suppressions);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des demandes de suppression.' });
  }
});

// Endpoint pour créer une nouvelle demande de suppression
router.post('/', async (req, res) => {
  const { id_bien, id_editeur, service } = req.body;
  if (!id_bien || !id_editeur || !service) {
    res.status(400).json({ error: 'Les champs id_bien, id_editeur et service sont obligatoires.' });
  }

  try {
    const newSuppression = await suppressionService.create(req.body);
    res.status(201).json(newSuppression);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de la demande de suppression.' });
  }
});

// Endpoint pour supprimer une demande de suppression
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSuppression = await suppressionService.delete(id);
    if (!deletedSuppression) {
      res.status(404).json({ error: 'Demande de suppression non trouvée avec cet ID.' });
    } else {
      res.json(deletedSuppression);
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de la demande de suppression.' });
  }
});

module.exports = router;
