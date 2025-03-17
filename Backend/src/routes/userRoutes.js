const express = require('express');
const router = express.Router();
const {
  createUser,
  verifyOTP,
  resendOTP,
  loginUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  getSavedJobs,
  saveJob,
  unsaveJob
} = require('../controllers/userController');

const authMiddleware = require('../middleware/authMiddleware');

// Public Routes
router.post('/register', createUser);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Protected Routes (require authentication)
router.get('/profile/:email', authMiddleware, getUserProfile);
router.get('/saved-jobs', authMiddleware, getSavedJobs);
router.post('/save-job', authMiddleware, saveJob);
router.delete('/unsave-job/:jobId', authMiddleware, unsaveJob);

module.exports = router;
