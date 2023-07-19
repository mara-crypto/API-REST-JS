const express = require('express');
const router = express.Router();
const propositionController = require('../controllers/propositionController');

// Endpoint pour créer une nouvelle proposition
router.post('/create', propositionController.createProposition);

// Endpoint pour récupérer toutes les propositions
router.get('/', propositionController.getAllPropositions);

// Endpoint pour récupérer une proposition spécifique
router.get('/:id', propositionController.getPropositionById);

// Endpoint pour mettre à jour une proposition
router.put('/:id/put', propositionController.updateProposition);

// Endpoint pour supprimer une proposition
router.delete('/:id/delete', propositionController.deleteProposition);

router.get('/editeur/:id', propositionController.getPropositionsByEditor);

module.exports = router;
