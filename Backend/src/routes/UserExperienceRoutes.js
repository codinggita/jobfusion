const express = require('express');
const { newUserExperienceAdder, getAllExperiences } = require('../controllers/UserExpoerienceController');
const UserExperienceRoutes = express.Router();

// Public Routes
UserExperienceRoutes.post('/newExperience', newUserExperienceAdder);
UserExperienceRoutes.get('/experiences', getAllExperiences);

module.exports = UserExperienceRoutes;
