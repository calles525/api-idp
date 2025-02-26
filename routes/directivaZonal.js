const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtener todas las sociedades
router.get('/alldirectivos', async (req, res) => {
    const zona = req.query.zona;
  try {
    const [rows] = await db.query(`SELECT P.*, DL.*, C.nombre AS cargonom FROM directiva_zonal AS DL, cargo AS C, persona AS P WHERE DL.id_zona = ${zona} and C.nivel = 'Zonal' and C.id_sociedad = 4 and C.id_cargo = DL.id_cargo and P.id_persona = DL.id_persona`);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/allcargos', async (req, res) => {
    const sociedad = req.query.sociedad;
    const nivel = req.query.nivel;
console.log(sociedad, nivel)
  try {
    const [rows] = await db.query(`SELECT * FROM cargo WHERE id_sociedad =  ${sociedad} and nivel =  ${nivel}`);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/registrardirectivo', async (req, res) => {
    const {
      operacionper,      
      operacioncargo,     
      p_cedula,
      p_nacionalidad,
      p_sexo,
      p_nombre,
      p_apellido,
      p_fecha_nacimiento,
      p_id_zona,
      p_id_persona,
      c_id_cargo,          
      id_directiva_zonal,
      p_email,
      i_idiglesia      
    } = req.body;
  
    console.log(req.body);
  
    try {
     
      const [result] = await db.query(
        `CALL gestionar_directivos_zonales(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?)`,
        [
          operacionper, 
          operacioncargo, 
          p_cedula, 
          p_nacionalidad, 
          p_sexo, 
          p_nombre, 
          p_apellido, 
          p_fecha_nacimiento, 
          p_id_zona, 
          p_id_persona, 
          c_id_cargo, 
          id_directiva_zonal,
          p_email,
          i_idiglesia
        ]
      );
  
     
      if (operacionper === 1) {
        
        res.json({
          success: true,
          message: 'Directivo registrado correctamente',
         
        });
      } else {
        res.json({
          success: true,
          message: 'Operación de directivo realizada con éxito',
        });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  



module.exports = router;
