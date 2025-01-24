const express = require('express');
const { searchJobs } = require('../controllers/jobController');

const router = express.Router();

// Define the route for searching jobs
router.get('/search', searchJobs);

module.exports = router;