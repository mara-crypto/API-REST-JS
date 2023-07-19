const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'API',
  password: '12345',
  port: 5432, // Votre port PostgreSQL
});

const suppressionService = {
  async getAll() {
    try {
      const query = 'SELECT * FROM suppression';
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  async create(data) {
    try {
      const { id_bien, id_editeur, service } = data;
      const query =
        'INSERT INTO suppression (id_bien, id_editeur, service) VALUES ($1, $2, $3) RETURNING *';
      const values = [id_bien, id_editeur, service];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async delete(id) {
    try {
      const query = 'DELETE FROM suppression WHERE id = $1 RETURNING *';
      const values = [id];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
};

module.exports = suppressionService;
