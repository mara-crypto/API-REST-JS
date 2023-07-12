const express = require('express');
const router = express.Router();
const electromenagerController = require('../controllers/electromenagerController');

// Définition des routes
router.get('/', electromenagerController.getAll);
router.post('/', electromenagerController.create);
router.get('/:id/get', electromenagerController.getById);
router.put('/:id/put', electromenagerController.update);
router.delete('/:id/delete', electromenagerController.delete);

module.exports = router;
