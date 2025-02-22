// backend/server.js
require('dotenv').config(); // Load environment variables first
const express = require('express');
const cors = require('cors');
const bodyParser = require('express').json;
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
