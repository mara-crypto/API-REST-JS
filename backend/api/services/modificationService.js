const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'API',
  password: '12345',
  port: 5432, // Votre port PostgreSQL
});

const modificationService = {
  getAllModifications: async () => {
    try {
      const query = 'SELECT * FROM modification';
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  getAllModificationsEditeur: async (id_editeur) => {
    try {
      const query = 'SELECT * FROM modification WHERE id_editeur = $1';
      const value = [id_editeur]
      const result = await pool.query(query, value);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  deleteModifications: async (id) => {
    try {
      const query = 'DELETE FROM modification WHERE id = $1';
      const value = [id]
      const result = await pool.query(query, value);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  createModification: async (modificationData) => {
    try {
      const {
        title,
        price,
        location,
        image,
        id_bien,
        id_editeur,
        service,
      } = modificationData;
      const query =
        'INSERT INTO modification (title, price, location, image, id_bien, id_editeur, service) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
      const values = [title, price, location, image, id_bien, id_editeur, service];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
};

module.exports = modificationService;
