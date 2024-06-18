// routes.js
const express = require('express');
const router = express.Router();
const { notifyClients } = require('./websocket');
const pool = require('./database'); // Importez votre connexion à la base de données depuis database.js

// GET /api/parties
router.get('/parties', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM parties ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur lors de la récupération des parties :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// POST /api/parties
router.post('/parties', async (req, res) => {
  const { joueurs } = req.body;
  try {
    await pool.query('INSERT INTO parties (joueurs) VALUES ($1)', [joueurs]);
    notifyClients(); // Propagation en temps réel
    res.status(201).end();
  } catch (err) {
    console.error('Erreur lors de l\'insertion d\'une partie :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// DELETE /api/parties/:id
router.delete('/parties/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM parties WHERE id = $1', [id]);
    notifyClients(); // Propagation en temps réel
    res.status(204).end();
  } catch (err) {
    console.error('Erreur lors de la suppression d\'une partie :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// PUT /api/parties/:id
router.put('/parties/:id', async (req, res) => {
  const { id } = req.params;
  const { terminee } = req.body;
  try {
    await pool.query('UPDATE parties SET terminee = $1 WHERE id = $2', [terminee, id]);
    notifyClients(); // Propagation en temps réel
    res.status(200).end();
  } catch (err) {
    console.error('Erreur lors de la mise à jour d\'une partie :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
