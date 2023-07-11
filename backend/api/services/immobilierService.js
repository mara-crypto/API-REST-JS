const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'API',
  password: '123',
  port: 5432, // Votre port PostgreSQL
});

const immobilierService = {
    async getAll() {
        try {
          const query = 'SELECT * FROM immobilier';
          const result = await pool.query(query);
          return result.rows;
        } catch (error) {
          throw error;
        }
  },

  async create(data) {
    try {
      const { title, price, location, image } = data;
      const query =
        'INSERT INTO immobilier (title, price, location, image) VALUES ($1, $2, $3, $4) RETURNING *';
      const values = [title, price, location, image];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async getById(id) {
    try {
      const query = 'SELECT * FROM immobilier WHERE id = $1';
      const values = [id];
      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        throw new Error('Aucun bien immobilier trouvé avec cet ID');
      }
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async update(id, data) {
    try {
      const { title, price, location, image } = data;
      const query =
        'UPDATE immobilier SET title = $1, price = $2, location = $3, image = $4 WHERE id = $5 RETURNING *';
      const values = [title, price, location, image, id];
      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        throw new Error('Aucun bien immobilier trouvé avec cet ID');
      }
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async delete(id) {
    try {
      const query = 'DELETE FROM immobilier WHERE id = $1 RETURNING *';
      const values = [id];
      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        throw new Error('Aucun bien immobilier trouvé avec cet ID');
      }
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
};

module.exports = immobilierService;
