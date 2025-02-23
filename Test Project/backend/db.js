// backend/db.js
require('dotenv').config(); // Ensure environment variables are loaded

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,       // e.g., 'localhost'
  user: process.env.DB_USER,       // your MySQL username
  password: process.env.DB_PASSWORD, // your MySQL password
  database: process.env.DB_NAME,   // e.g., 'chefs_code'
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
