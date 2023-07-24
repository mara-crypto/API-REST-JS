const express = require('express');
const router = express.Router();

const modificationController = require('../controllers/modificationController');

router.get('/', modificationController.getAllModifications);
router.get('/editeur/:id_editeur', modificationController.getAllModificationsEditeur);
router.delete('/:id', modificationController.deleteModifications);
router.post('/', modificationController.createModification);

module.exports = router;
