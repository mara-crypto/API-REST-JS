const express = require('express');
const router = express.Router();
const immobilierController = require('../controllers/immobilierController');

// Définition des routes
router.get('/', immobilierController.getAll);
router.post('/', immobilierController.create);
router.get('/:id', immobilierController.getById);
router.put('/:id', immobilierController.update);
router.delete('/:id', immobilierController.delete);

module.exports = router;
