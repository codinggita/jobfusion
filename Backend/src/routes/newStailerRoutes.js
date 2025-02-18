const express = require('express');
const { addNewStailer, getAllNewStailers } = require('../controllers/newStailerController');

const router = express.Router();

router.post('/newstailer', addNewStailer); // Add a new stailer
router.get('/newstailer', getAllNewStailers); // Get all new stailers

module.exports = router;