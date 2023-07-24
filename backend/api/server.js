const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');

const immobilierRoutes = require('./routes/immobilierRoutes');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// Configurer le middleware pour servir les fichiers statiques du dossier front-end
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes pour les différentes ressources
app.use('/api/immobilier', immobilierRoutes);

const normalizePort = val => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.log(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.log(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);
