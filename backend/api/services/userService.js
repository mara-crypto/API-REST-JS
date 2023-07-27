const { Pool } = require('pg');
const bcrypt = require('bcrypt');


// Configuration de la connexion à la base de données PostgreSQL
const pool = new Pool({
    user: 'postgres',
    password: '12345',
    host: '127.0.0.1',
    port: 5432, // Le port par défaut de PostgreSQL est 5432
    database: 'API',
  });
const postUser = async (mail) => {
    try {
        const query = 'SELECT * FROM utilisateur WHERE mail = $1';
        const values = [mail];
        const result = await pool.query(query, values);
        const user = result.rows[0];

        if (user === undefined) {
          // L'utilisateur n'existe pas
            return null;
        }

        const isPasswordHashed = user.password.startsWith('$2');
        
        if (isPasswordHashed) {
          // Le mot de passe est déjà haché, pas besoin de le ré-hacher
            return user;
        } else {
          // Hacher le mot de passe existant avec bcrypt
            const hashedPassword = await bcrypt.hash(user.password, 10);

          // Mettre à jour le mot de passe dans la base de données avec le mot de passe haché
            const updateQuery = 'UPDATE utilisateur SET password = $1 WHERE id = $2';
            const updateValues = [hashedPassword, user.id];
            await pool.query(updateQuery, updateValues);

            // Mettre à jour l'objet utilisateur avec le mot de passe haché
            user.password = hashedPassword;

            return user;
      }
    } catch (error) {
        throw new Error("Une erreur est survenue lors de la récupération des infos de l'utilisateur.");
    }
};

const getUser = async () => {
    try {
        const query = 'SELECT * FROM utilisateur;';
        const result = await pool.query(query);
        console.log('Récupération avec succès');
        return result.rows;
    } catch (error) {
        throw new Error('Une erreur est survenue lors de la récupération des utilsateur depuis la base de données.');
    }
};
  
module.exports = {
    postUser,
    getUser,
};