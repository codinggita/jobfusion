// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
    createUser,
    loginUser,
    getUserProfile,
    getSavedJobs,
    saveJob,
    unsaveJob
} = require('../controllers/userController');

// User Registration
router.post('/register', createUser);

// User Login
router.post('/login', loginUser);

// Get User Profile
router.get('/profile/:email', getUserProfile);

module.exports = router;
