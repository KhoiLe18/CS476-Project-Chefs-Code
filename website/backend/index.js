const express = require('express');
const axios = require('axios');
const ejs = require('ejs');

const app = express();
const api_Key = "0652000f796c48bdb6a8926b2ea84ef2";

// Middleware for parsing url-encoded data
app.use(express.urlencoded({ extended: false }));
// Middleware to handle JSON responses (in case you use JSON for API requests)
app.use(express.json());

// Set views directory and EJS as view engine
app.set('view engine', 'ejs');

// Route to serve the homepage with the search form
app.get('/', (req, res) => {
  res.render('index');
});

// API route to search for recipes based on ingredients
app.post('/api/search', async (req, res) => {
  const { query, cuisines, dietaryRequirements } = req.body;

  // Construct query params to pass to Spoonacular API
  let url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${api_Key}`;

  // Add optional filters (cuisines and dietary requirements) if provided
  if (cuisines && cuisines.length > 0) {
    url += `&cuisine=${cuisines.join(',')}`;
  }
  if (dietaryRequirements && dietaryRequirements.length > 0) {
    url += `&diet=${dietaryRequirements.join(',')}`;
  }

  try {
    const response = await axios.get(url);
    const recipes = response.data.results;
    res.json(recipes);  // Send JSON response with the list of recipes
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching recipes from API' });
  }
});

// API route to get detailed information of a single recipe
app.get('/api/recipe/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${api_Key}`);
    const recipe = response.data;
    res.json(recipe);  // Send JSON response with recipe details
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching recipe details from API' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
