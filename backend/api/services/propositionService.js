const { Pool } = require('pg');

// Configuration de la connexion à la base de données PostgreSQL
const pool = new Pool({
  user: 'postgres',
  password: '12345',
  host: '127.0.0.1',
  port: 5432, // Le port par défaut de PostgreSQL est 5432
  database: 'API',
});



// Action pour récupérer toutes les propositions
const getAllPropositions = async () => {
  try {
    const query = 'SELECT * FROM proposition;';
    const result = await pool.query(query);
    console.log('Récupération avec succès');
    return result.rows;
  } catch (error) {
    throw new Error('Une erreur est survenue lors de la récupération de la proposition depuis la base de données.');
  }
};


// Action pour récupérer une proposition spécifique par son ID
const getPropositionById = async (id) => {
  try {
    const query = 'SELECT * FROM proposition WHERE id = $1;';
    const result = await pool.query(query, [id]);
    console.log(`Récupération de la proposition avec l'identifiant ${id}`);
    return result.rows[0];
  } catch (error) {
    throw new Error('Une erreur est survenue lors de la récupération de la proposition depuis la base de données.');
  }
};


// Action pour créer une nouvelle proposition
const createProposition = async (type, id_electronique, id_electromenager, id_immobilier, id_utilisateur) => {
  try {
    const query = 'INSERT INTO proposition (type, id_electronique, id_electromenager, id_immobilier, id_utilisateur) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [type, id_electronique, id_electromenager, id_immobilier, id_utilisateur];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error('Une erreur est survenue lors de la création de la nouvelle  proposition.');
  }
};

// Action pour mettre à jour une proposition
const updateProposition = async (type, statut, id_electronique, id_electromenager, id_immobilier, id_utilisateur, id) => {
  try {
    const query = 'UPDATE proposition SET type = $1, statut = $2, id_electronique = $3, id_electromenager = $4, id_immobilier = $5, id_utilisateur = $6  WHERid_utilisateurE id = $7 RETURNING *';
    const values = [type, statut, id_electronique, id_electromenager, id_immobilier, id_utilisateur, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error('Une erreur est survenue lors de la mise à jour de la  proposition.');
  }
};



// Action pour supprimer une proposition
const deleteProposition = async (id) => {
  try {
    const query = 'DELETE FROM proposition WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error('Une erreur est survenue lors de la suppression de la proposition.');
  }
};

const getAllPropositionsByEditeur = async (id) => {
    try {
      const query = 'SELECT * FROM proposition WHERE id_utilisateur = $1;';
      const value = [id];
      const result = await pool.query(query, value);
      console.log('Récupération avec succès');
      return result.rows;
    } catch (error) {
      throw new Error('Une erreur est survenue lors de la récupération de la proposition depuis la base de données.');
    }
  };

// Autres fonctions pour la création, la mise à jour et la suppression des produits électroniques

module.exports = {
  getAllPropositions,
  getPropositionById,
  createProposition,
  updateProposition,
  deleteProposition,
  getAllPropositionsByEditeur
};