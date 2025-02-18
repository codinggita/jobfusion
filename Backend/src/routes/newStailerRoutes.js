const express = require('express');
const { addNewStailer, getAllNewStailers } = require('../controllers/newStailerController');

const router = express.Router();

router.post('/', addNewStailer);
router.get('/', getAllNewStailers);

module.exports = router;
