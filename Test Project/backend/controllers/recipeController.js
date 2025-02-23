// backend/controllers/recipeController.js
const axios = require('axios');
const pool = require('../db');
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY; // Make sure this is set in your environment
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret'; // Use an environment variable in production

// Middleware to authenticate requests
exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Missing authorization header' });
  const token = authHeader.split(' ')[1];
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

exports.searchRecipes = async (req, res) => {
  // Expecting a request body with "ingredients" and "filters"
  let { ingredients, filters } = req.body;
  filters = filters || {};

  // Build parameters for the Spoonacular complexSearch endpoint
  const params = {
    apiKey: SPOONACULAR_API_KEY,
    includeIngredients: ingredients, // Comma-separated string of ingredients
    number: 10,
  };

  // Process dietary filters into the "diet" and "intolerances" parameters.
  // Set the diet parameter if vegan or vegetarian filters are active.
  if (filters.vegan) {
    params.diet = 'vegan';
  } else if (filters.vegetarian) {
    params.diet = 'vegetarian';
  }

  // Map other filters to intolerances.
  const intolerances = [];
  if (filters.dairyFree) intolerances.push('dairy');
  if (filters.nutFree) intolerances.push('nuts');
  if (filters.noBeef) intolerances.push('beef');
  if (filters.noPork) intolerances.push('pork');

  if (intolerances.length > 0) {
    params.intolerances = intolerances.join(',');
  }

  try {
    // Use the complexSearch endpoint to support these parameters.
    const response = await axios.get(
      'https://api.spoonacular.com/recipes/complexSearch',
      { params }
    );
    // The Spoonacular API returns an object with a "results" array.
    res.json(response.data.results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching recipes' });
  }
};

// ... (other controller methods remain unchanged)