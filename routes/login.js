const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Configuración de la conexión a la base de datos

// Ruta para realizar el login
router.post('/login', async (req, res) => {
  const { usuario, contrasena } = req.body;
  console.log(req.body);
  try {
    // Llamar a la función almacenada con los parámetros
    const query = `CALL ObtenerInformacionUsuario(?, ?);`;
    const [results] = await db.query(query, [usuario, contrasena]); // Sin .promise()

    // Verificar si la función retornó datos
    if (results && results.length > 0) {
      return res.json({ success: true, data: results[0] });
    } else {
      return res.status(401).json({ success: false, error: 'Credenciales inválidas.' });
    }
  } catch (error) {
    console.error('Error ejecutando la función almacenada:', error);
    return res.status(500).json({ success: false, error: 'Error interno del servidor.' });
  }
});

module.exports = router;
