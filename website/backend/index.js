const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import CORS
const app = express();

// Spoonacular API key
const api_Key = "0652000f796c48bdb6a8926b2ea84ef2";

// Middleware for parsing JSON and form data
app.use(express.json()); // Handle JSON data
app.use(express.urlencoded({ extended: false })); // Handle form data
app.use(cors()); // Enable CORS for all origins (frontend can communicate with this backend)

// Route to handle search requests
app.post('/api/search', async (req, res) => {
  const { query, cuisines, dietaryRequirements } = req.body;

  try {
    // Construct the API request to Spoonacular with ingredients and filters
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch`, {
        params: {
          query: query,
          cuisine: cuisines.join(','),
          diet: dietaryRequirements.join(','),
          apiKey: api_Key
        }
      }
    );

    const recipes = response.data.results;
    res.json(recipes); // Return the recipes data to the frontend
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

// Set up the backend to listen on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});