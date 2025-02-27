const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const db = pool.promise();

// Test connection to the database
db.getConnection()
  .then(connection => {
    console.log('Successfully connected to the database');
    connection.release(); // Release the connection back to the pool
  })
  .catch(error => {
    console.error('Error connecting to the database:', error.message);
  });

module.exports = db;
