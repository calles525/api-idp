const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());
// Enable CORS for all routes
app.use(cors());

// Or enable CORS for specific origins
app.use(
  cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
  })
);

// Rutas
app.use('/api/sociedad', require('./routes/sociedad'));
app.use('/api/persona', require('./routes/persona'));
app.use('/api/directivalocal', require('./routes/directivaLocal'));
app.use('/api/directivazonal', require('./routes/directivaZonal'));
app.use('/api/login', require('./routes/login'));
app.use('/api/iglesia', require('./routes/igelsias'));



//
//app.use('/api/zona', require('./routes/zona'));
//app.use('/api/iglesia', require('./routes/iglesia'));
//app.use('/api/cargo', require('./routes/cargo'));
//app.use('/api/directiva-local', require('./routes/directivaLocal'));
//app.use('/api/directiva-zonal', require('./routes/directivaZonal'));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
