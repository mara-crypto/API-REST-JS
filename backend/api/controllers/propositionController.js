const Proposition = require('../services/propositionService');

// Action pour créer une nouvelle proposition
const createProposition = async (req, res) => {
  try {
    // Récupérer les données de la proposition depuis le corps de la requête
    const { type, id_electronique, id_electromenager, id_immobilier, id_utilisateur} = req.body;

    const proposition = await Proposition.createProposition(type, id_electronique, id_electromenager, id_immobilier, id_utilisateur);
    res.status(201).json({ message: 'Proposition créée avec succès', proposition });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la proposition', error: error.message });
  }
};

// Action pour récupérer toutes les propositions
const getAllPropositions = async (req, res) => {
  try {
    // Récupérer toutes les propositions depuis la base de données
    const propositions = await Proposition.getAllPropositions();

    res.status(200).json( propositions );
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des propositions', error: error.message });
  }
};

// Action pour récupérer une proposition spécifique par son ID
const getPropositionById = async (req, res) => {
  try {
    const { id } = req.params;

    // Récupérer la proposition depuis la base de données par son ID
    const proposition = await Proposition.getPropositionById(id);

    if (!proposition) {
      res.status(404).json({ message: 'Proposition introuvable' });
    } else {
      res.status(200).json(proposition);
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la proposition', error: error.message });
  }
};

// Action pour mettre à jour une proposition
const updateProposition = async (req, res) => {
  try {
    const { id } = req.params;

    // Récupérer les données de mise à jour depuis le corps de la requête
    const { type, statut, id_electronique, id_electromenager, id_immobilier, id_utilisateur } = req.body;

    // Mettre à jour la proposition dans la base de données par son ID
    const updatedProposition = await Proposition.updateProposition(type, statut, id_electronique, id_electromenager, id_immobilier, id_utilisateur, id);

    if (!updatedProposition) {
      res.status(404).json({ message: 'Proposition introuvable' });
    } else {
      res.status(200).json({ message: 'Proposition mise à jour avec succès', proposition: updatedProposition });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la proposition', error: error.message });
  }
};

// Action pour supprimer une proposition
const deleteProposition = async (req, res) => {
  try {
    const { id } = req.params;

    // Supprimer la proposition de la base de données par son ID
    const deletedProposition = await Proposition.deleteProposition(id);

    if (!deletedProposition) {
      res.status(404).json({ message: 'Proposition introuvable' });
    } else {
      res.status(200).json({ message: 'Proposition supprimée avec succès' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la proposition', error: error.message });
  }
};

// Action pour récupérer les propositions d'un éditeur spécifique
const getPropositionsByEditor = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Récupérer les propositions de l'éditeur depuis la base de données
      const propositions = await Proposition.getAllPropositionsByEditeur( id );
  
      res.status(200).json({ propositions });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des propositions de l\'éditeur', error: error.message });
    }
  };
  
  module.exports = {
    // ... autres actions du contrôleur
    getPropositionsByEditor
  };
  

module.exports = {
  createProposition,
  getAllPropositions,
  getPropositionById,
  updateProposition,
  deleteProposition,
  getPropositionsByEditor
};
