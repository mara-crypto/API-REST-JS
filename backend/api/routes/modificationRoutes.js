const express = require('express');
const router = express.Router();

const modificationController = require('../controllers/modificationController');

router.get('/', modificationController.getAllModifications);
router.get('/editeur/:id', modificationController.getAllModificationsEditeur);
router.post('/', modificationController.createModification);

module.exports = router;
