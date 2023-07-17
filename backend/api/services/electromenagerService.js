const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'API',
  password: '12345',
  port: 5432, // Votre port PostgreSQL
});

const electromenagerService = {
  async getAll() {
    try {
      const query = 'SELECT * FROM electromenager';
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  async create(data) {
    try {
      const {title, price, location, image } = data;
      const query = 'INSERT INTO electromenager (title, price, location, image) VALUES ($1, $2, $3, $4) RETURNING *';
      const values = [title, price, location, image];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async getById(id) {
    try {
      const query = 'SELECT * FROM electromenager WHERE id = $1';
      const values = [id];
      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        throw new Error('Aucun électroménager trouvé avec cet ID');
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
        'UPDATE electromenager SET title = $1, price = $2, location = $3, image = $4 WHERE id = $5 RETURNING *';
      const values = [title, price, location, image, id];
      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        throw new Error('Aucun électroménager trouvé avec cet ID');
      }
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async delete(id) {
    try {
      const query = 'DELETE FROM electromenager WHERE id = $1 RETURNING *';
      const values = [id];
      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        throw new Error('Aucun électroménager trouvé avec cet ID');
      }
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
};

module.exports = electromenagerService;
