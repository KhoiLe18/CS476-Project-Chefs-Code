// backend/routes/recipeRoutes.js
const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Public route: search recipes and get details
router.post('/search', recipeController.searchRecipes);
router.get('/:id', recipeController.getRecipeDetails);

// The routes below require authentication:
router.use(recipeController.authenticate);
router.post('/favorite', recipeController.saveFavorite);
router.get('/favorites/list', recipeController.getFavorites);
router.post('/history', recipeController.addToHistory);
router.get('/history/list', recipeController.getHistory);

module.exports = router;
