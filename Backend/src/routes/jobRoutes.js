const express = require('express');
const { searchJobs, getTrendingJobs } = require('../controllers/jobController'); // Import both functions

const router = express.Router();

// Define routes
router.get('/search', searchJobs); // Search jobs route
router.get('/trending', getTrendingJobs); // Trending jobs route

module.exports = router;
