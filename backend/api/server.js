const http = require('http');
const express = require('express');
const electroniqueRoutes = require('./routes/electroniqueRoutes');
const immobilierRoutes = require('./routes/immobilierRoutes');
const electromenagerRoutes = require('./routes/electromenagerRoutes');

const { error } = require('console');


const app = express();
const server = http.createServer(app);


app.use(express.json());

// Routes pour les différentes ressources
app.use('/api/electroniques', electroniqueRoutes);
// app.use('/api/electromenagers', electromenagerRoutes);
app.use('/api/immobilier', immobilierRoutes);
app.use('/api/electromenager', electromenagerRoutes);


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

// const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);