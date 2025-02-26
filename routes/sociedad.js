const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtener todas las sociedades
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM sociedad');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear una nueva sociedad
router.post('/', async (req, res) => {
  const { nombre } = req.body;
  try {
    const [result] = await db.query('INSERT INTO sociedad (nombre) VALUES (?)', [nombre]);
    res.json({ id: result.insertId, nombre });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar una sociedad
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    await db.query('UPDATE sociedad SET nombre = ? WHERE id_sociedad = ?', [nombre, id]);
    res.json({ message: 'Sociedad actualizada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar una sociedad
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM sociedad WHERE id_sociedad = ?', [id]);
    res.json({ message: 'Sociedad eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
