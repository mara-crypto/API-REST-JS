const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'API',
  password: '123',
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
      const { name, brand, price } = data;
      const query = 'INSERT INTO electromenager (name, brand, price) VALUES ($1, $2, $3) RETURNING *';
      const values = [name, brand, price];
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
      const { name, brand, price } = data;
      const query =
        'UPDATE electromenager SET name = $1, brand = $2, price = $3 WHERE id = $4 RETURNING *';
      const values = [name, brand, price, id];
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
