// routes/userRoutes.js
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

// User Registration
router.post('/register', createUser);

// Verify OTP for account verification
router.post('/verify-otp', verifyOTP);

// Resend OTP for account verification
router.post('/resend-otp', resendOTP);

// User Login
router.post('/login', loginUser);

// Forgot Password - Send OTP
router.post('/forgot-password', forgotPassword);

// Reset Password with OTP
router.post('/reset-password', resetPassword);

// Get User Profile
router.get('/profile/:email', getUserProfile);

module.exports = router;
