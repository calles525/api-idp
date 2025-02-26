const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtener todos los niños por iglesia
router.get('/alliglesias', async (req, res) => {
    const zona = req.query.zona;
  try {
    const [rows] = await db.query(`SELECT i.nombre AS nombrei, i.* , p.* FROM iglesia AS i , persona AS p WHERE i.id_zona = ${zona} AND p.id_persona = i.id_pastor `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/registrariglesia', async (req, res) => {
  const {
    operacionper,
    operacion,
    p_cedula,
    p_nacionalidad,
    p_sexo,
    p_nombre,
    p_apellido,
    p_fecha_nacimiento,
    p_edad,
    p_id_iglesia,
    p_id_persona,
    nombrei,
    direccion,
    zona,
  } = req.body;

  try {
    // Llamada a la función almacenada 'registrar_iglesia' en la base de datos
    await db.query(
      `CALL registrar_iglesia(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        operacionper,
        operacion,
        p_cedula,
        p_nacionalidad,
        p_sexo,
        p_nombre,
        p_apellido,
        p_fecha_nacimiento,
        p_edad,
        p_id_iglesia,
        p_id_persona,
        nombrei,
        direccion,
        zona,
      ]
    );

    res.status(200).json({ message: 'Operación completada exitosamente.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





module.exports = router;
