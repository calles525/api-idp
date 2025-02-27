const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const morgan = require('morgan');

// Middlewares
app.use(bodyParser.json());
// Enable CORS for all origins (allow all connections)
app.use(cors({
  origin: '*',  // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed headers
}));
app.use(morgan('dev'));

// Rutas
app.use('/api/sociedad', require('./routes/sociedad'));
app.use('/api/persona', require('./routes/persona'));
app.use('/api/directivalocal', require('./routes/directivaLocal'));
app.use('/api/directivazonal', require('./routes/directivaZonal'));
app.use('/api/login', require('./routes/login'));
app.use('/api/iglesia', require('./routes/igelsias'));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
