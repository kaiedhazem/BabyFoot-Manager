const partiesDiv = document.getElementById('parties');
const inputPartie = document.getElementById('nouvelle-partie');
const btnAjouter = document.getElementById('ajouter');

const ws = new WebSocket('ws://localhost:3000');

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'update') {
      loadParties();
    } else if (data.type === 'message') {
      afficherMessage(data.message);
    }
  };

btnAjouter.addEventListener('click', () => {
  const joueurs = inputPartie.value.trim();
  if (joueurs) {
    fetch('/api/parties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ joueurs })
    }).then(() => {
      inputPartie.value = '';
      loadParties();
    });
  }
});

function loadParties() {
  fetch('/api/parties')
    .then(response => response.json())
    .then(parties => {
      partiesDiv.innerHTML = '';
      parties.forEach(partie => {
        const div = document.createElement('div');
        div.className = 'partie';
        if (partie.terminee) div.classList.add('terminee');
        div.innerHTML = `
          ${partie.joueurs} 
          <button onclick="terminerPartie(${partie.id})">Terminer</button>
          <button onclick="supprimerPartie(${partie.id})">Supprimer</button>
        `;
        partiesDiv.appendChild(div);
      });
      updateCompteur(parties);
    });
}

function terminerPartie(id) {
  fetch(`/api/parties/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ terminee: true })
  }).then(loadParties);
}

function supprimerPartie(id) {
  fetch(`/api/parties/${id}`, {
    method: 'DELETE'
  }).then(loadParties);
}

function updateCompteur(parties) {
  const nonTerminees = parties.filter(partie => !partie.terminee).length;
  const compteur = document.querySelector('.compteur');
  if (compteur) {
    compteur.innerHTML = nonTerminees;
  } else {
    const compteurDiv = document.createElement('div');
    compteurDiv.className = 'compteur';
    compteurDiv.innerHTML = nonTerminees;
    document.body.appendChild(compteurDiv);
  }
}




document.getElementById('envoyer').addEventListener('click', () => {
    envoyerMessage();
  });
  
  document.getElementById('message').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      envoyerMessage();
    }
  });
  
  function envoyerMessage() {
    const nickname = document.getElementById('nickname').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (nickname && message) {
      const fullMessage = `${nickname} : ${message}`;
      ws.send(JSON.stringify({ type: 'message', message: fullMessage }));
      afficherMessage(fullMessage);
      document.getElementById('message').value = '';
    }
  }
  
  function afficherMessage(message) {
    const messagesDiv = document.getElementById('messages');
    const messageElem = document.createElement('div');
    messageElem.textContent = message;
    messagesDiv.appendChild(messageElem);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
  

loadParties();





