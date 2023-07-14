const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'API',
  password: '123',
  port: 5432, // Votre port PostgreSQL
});

const authController = {
  async login(req, res) {
    const { mail, password } = req.body;
    try {
      const query = 'SELECT * FROM utilisateur WHERE mail = $1 AND password = $2';
      const values = [mail, password];
      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        res.status(401).json({ message: 'Identifiants invalides' });
      } else {
        const user = result.rows[0];
        res.json({ message: 'Connexion réussie', user });
      }
    } catch (error) {
      res.status(500).json({ message: 'Une erreur est survenue lors de la connexion', error });
    }
  },
};

module.exports = authController;
