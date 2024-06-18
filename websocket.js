// websocket.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
  console.log('Client connecté');

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.type === 'message') {
      // Diffuser le message à tous les clients connectés
      wss.clients.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'message', message: data.message }));
        }
      });
    } else if (data.type === 'update') {
      // Propagation des mises à jour de la liste des parties
      notifyClients();
    }
  });
});

function notifyClients() {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: 'update' }));
    }
  });
}

module.exports = {
  wss,
  notifyClients,
};
