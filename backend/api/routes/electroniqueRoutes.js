const express = require('express');
const router = express.Router();
const electroniqueController = require('../controllers/electroniqueController');

// Route pour obtenir tous les électroniques
router.get('/', electroniqueController.getAllElectroniques);


// Route pour obtenir un produit électronique
router.get('/:id', electroniqueController.getElectroniqueById);


//  Route pour ajouter un nouveau produit 
router.post('/new', electroniqueController.postNewElectronique);


//  Route pour modifier un produit 
router.put('/:id/put', electroniqueController.putElectronique);


//  Route pour supprimer un produit 
router.delete('/:id/delete', electroniqueController.deleteElectronique);


// Autres routes pour la création, la mise à jour et la suppression des électroniques

module.exports = router;

