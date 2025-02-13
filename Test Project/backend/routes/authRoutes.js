// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const recipeController = require('../controllers/recipeController'); // if you use its authenticate middleware

router.post('/register', authController.register);
router.post('/login', authController.login);

// Profile route (requires token authentication)
router.get('/profile', recipeController.authenticate, authController.getProfile);

module.exports = router;
