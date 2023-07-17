const { Pool } = require('pg');

// Configuration de la connexion à la base de données PostgreSQL
const pool = new Pool({
  user: 'postgres',
  password: '12345',
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
    return result.rows[0];
  } catch (error) {
    throw new Error('Une erreur est survenue lors de la récupération du produit électronique depuis la base de données.');
  }
};


//  Fonctions pour ajouter un nouveau produit dans la bases
const postNewElectronique = async (title, price, location, image) => {
  try {
    const query = 'INSERT INTO electronique (title, price, location, image) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [title, price, location, image];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error('Une erreur est survenue lors de la création du nouveau produit électronique.');
  }
};

//  Fonctions pour modifier un produit dans la bases
const putElectronique = async (title, price, location, image, id) => {
  try {
    const query = 'UPDATE electronique SET title = $1, price = $2, location = $3, image = $4 WHERE id = $5 RETURNING *';
    const values = [title, price, location, image, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error('Une erreur est survenue lors de la mise à jour du produit électronique.');
  }
};



//  Fonctions pour Supprimer un produit dans la bases
const deleteElectronique = async (id) => {
  try {
    const query = 'DELETE FROM electronique WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error('Une erreur est survenue lors de la suppression du produit électronique.');
  }
};

// Autres fonctions pour la création, la mise à jour et la suppression des produits électroniques

module.exports = {
  getAllElectroniques,
  getElectroniqueById,
  postNewElectronique,
  putElectronique,
  deleteElectronique,
};