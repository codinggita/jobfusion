const express = require('express');
const { searchJobs, getTrendingJobs, getRandomJobs } = require('../controllers/jobController');

const router = express.Router();


// Endpoints For Each API Request
router.get('/search', searchJobs); 
router.get('/trending', getTrendingJobs);
router.get('/random', getRandomJobs); 

module.exports = router;
