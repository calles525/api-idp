const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtener todos los niños por iglesia
router.get('/', async (req, res) => {
    const iglesia = req.query.iglesia;
  try {
    const [rows] = await db.query(`SELECT * FROM persona WHERE id_iglesia = ${iglesia} and edad < 18`);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



//Regsitrar personas

router.post('/persona', async (req, res) => {
  const {
    operacion,
    p_cedula,
    p_nacionalidad,
    p_sexo,
    p_nombre,
    p_apellido,
    p_fecha_nacimiento,
    p_id_iglesia,
    p_id_persona,
  } = req.body;

  console.log('persona')
  console.log(req.body)

  try {
   

    // Llamar al procedimiento almacenado
    const [result] = await db.query(
      `CALL GestionarPersona(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [operacion, p_cedula, p_nacionalidad, p_sexo, p_nombre, p_apellido, p_fecha_nacimiento, p_id_iglesia, p_id_persona]
    );

    // Si la operación es de inserción, puedes obtener el ID de la persona insertada
    if (operacion === 1) {
      res.json({
        success: true,
        id: result[0][0].id_persona, // Asegúrate de que el procedimiento devuelva el ID
        edad: `${edad} años`, // Puedes ajustar esto si necesitas más detalles
      });
    } else {
      res.json({
        success: true,
        message: 'Operación realizada con éxito',
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Obtener todos los niños por iglesia
router.get('/onepersona', async (req, res) => {
  const cedula = req.query.cedula;
try {
  const [rows] = await db.query(`SELECT * FROM persona WHERE cedula = ${cedula} `);
  res.json(rows);
} catch (err) {
  res.status(500).json({ error: err.message });
}
});




module.exports = router;
