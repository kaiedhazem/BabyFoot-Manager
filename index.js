// index.js
const express = require('express');
const http = require('http');
const { wss } = require('./websocket');
const routes = require('./routes');
require('dotenv').config(); // Charge les variables d'environnement depuis .env

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.static('public'));

// Utilisation des routes définies dans routes.js
app.use('/api', routes);

// Connexion des clients WebSocket au serveur HTTP
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
