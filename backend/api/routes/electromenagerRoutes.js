const express = require('express');
const router = express.Router();
const electromenagerController = require('../controllers/electromenagerController');

// Définition des routes
router.get('/', electromenagerController.getAll);
router.post('/', electromenagerController.create);
router.get('/:id', electromenagerController.getById);
router.put('/:id', electromenagerController.update);
router.delete('/:id', electromenagerController.delete);

module.exports = router;
