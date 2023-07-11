const { Pool } = require('pg');

// Configuration de la connexion à la base de données PostgreSQL
const pool = new Pool({
  user: 'postgres',
  password: '026470Diop',
  host: '127.0.0.1',
  port: 5432, // Le port par défaut de PostgreSQL est 5432
  database: 'API',
});



// Fonction pour obtenir tous les produits électroniques depuis la base de données
const getAllElectroniques = async () => {
  try {
    const query = 'SELECT * FROM electronique;';
    const result = await pool.query(query);
    console.log('Récupération avec succès');
    return result.rows;
  } catch (error) {
    throw new Error('Une erreur est survenue lors de la récupération des produits électroniques depuis la base de données.');
  }
};


// Fonction pour récupérer un produit électronique par son identifiant
const getElectroniqueById = async (id) => {
  try {
    const query = 'SELECT * FROM electronique WHERE id = $1;';
    const result = await pool.query(query, [id]);
    console.log(`Récupération de l'objet avec l'identifiant ${id}`);
    return result.rows;
  } catch (error) {
    throw new Error("Une erreur est survenue lors de la récupération du produit électronique depuis la base de données.");
  }
};


//  Fonctions pour ajouter un nouveau produit dans la bases
const posttElectronique = async (title, price, location, image) => {
  try {
    const query = `INSERT INTO electronique (title, price, location, image) VALUES (${title}, ${price}, ${location}, ${image})`;
    const result = await pool.query(query)
    console.log("insertions fait avec succes");

  }
};

// Autres fonctions pour la création, la mise à jour et la suppression des produits électroniques

module.exports = {
  getAllElectroniques,
  getElectroniqueById,
  // Exportez les autres fonctions nécessaires
};
