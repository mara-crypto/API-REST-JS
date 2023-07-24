const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'API',
  password: '12345',
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
        'INSERT INTO immobilier (title, price, location, image, etat) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const values = [title, price, location, image, true]; // Nouveaux biens ont un état "true" par défaut
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
      // Vérifier si le bien immobilier avec l'ID spécifié existe
      const existingImmobilier = await this.getById(id);

      if (!existingImmobilier) {
        throw new Error('Aucun bien immobilier trouvé avec cet ID');
      }

      // Fusionner les nouvelles données avec les anciennes données pour ne mettre à jour que les propriétés fournies
      const updatedImmobilier = { ...existingImmobilier, ...data };

      // Supprimer l'ID du nouvel objet de bien immobilier, car nous ne voulons pas mettre à jour l'ID de la ligne
      delete updatedImmobilier.id;

      const { title, price, location, image, etat } = updatedImmobilier;
      const query =
        'UPDATE immobilier SET title = $1, price = $2, location = $3, image = $4, etat = $5 WHERE id = $6 RETURNING *';
      const values = [title, price, location, image, etat, id];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
};

module.exports = immobilierService;
