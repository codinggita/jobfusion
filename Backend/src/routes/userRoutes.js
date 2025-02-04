const express = require('express');
const { createUser, loginUser ,getUserProfile } = require('../controllers/userController'); // Import both functions
const router = express.Router();

// Route for user registration
router.post('/register', createUser);

// Route for user login
router.post('/login', loginUser);

router.get('/profile/:email', getUserProfile);

module.exports = router;