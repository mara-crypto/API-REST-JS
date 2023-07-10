const express = require('express');
const app = express();
const port = 3000;

// Middleware pour traiter les données JSON
app.use(express.json());

// Importation des routes
const immobilierRoutes = require('./routes/immobilierRoutes');

// Utilisation des routes
app.use('/api/immobilier', immobilierRoutes);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
