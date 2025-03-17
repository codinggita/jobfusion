const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Job = require('../models/Job'); // Ensure Job model exists
const emailService = require('../utils/emailService');

// User Registration with OTP
const createUser = async (req, res) => {
  try {
    const { username, email, password, experienceLevel } = req.body;

    if (!username || !email || !password || !experienceLevel) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: username, email, password, experienceLevel',
      });
    }

    let user = await User.findOne({ email });
    if (user) {
      if (user.isVerified) {
        return res.status(400).json({ success: false, message: 'Email already in use' });
      } else {
        const otp = emailService.generateOTP();
        const otpExpiryTime = new Date(Date.now() + 10 * 60 * 1000); 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.username = username;
        user.password = hashedPassword;
        user.experienceLevel = experienceLevel;
        user.otp = { code: otp, expiresAt: otpExpiryTime };
        await user.save();

        const emailSent = await emailService.sendOTP(email, otp);
        if (!emailSent) {
          return res.status(500).json({ success: false, message: 'Failed to send verification email' });
        }

        return res.status(200).json({
          success: true,
          message: 'A new verification code has been sent to your email',
          data: { email },
        });
      }
    }

    const otp = emailService.generateOTP();
    const otpExpiryTime = new Date(Date.now() + 10 * 60 * 1000);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await User.create({
      username,
      email,
      password: hashedPassword,
      experienceLevel,
      otp: { code: otp, expiresAt: otpExpiryTime },
    });

    const emailSent = await emailService.sendOTP(email, otp);
    if (!emailSent) {
      return res.status(500).json({ success: false, message: 'Failed to send verification email' });
    }

    res.status(201).json({
      success: true,
      message: 'User created successfully. Please verify your email with the OTP sent.',
      data: { email: user.email },
    });
  } catch (error) {
    console.error('Error in createUser:', error.message);
    res.status(500).json({ success: false, message: 'Error creating user', error: error.message });
  }
};

// Verify OTP
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Please provide email and OTP' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (!user.otp || user.otp.code !== otp || user.otp.expiresAt < new Date()) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    user.isVerified = true;
    user.otp = undefined;
    await user.save();

    res.status(200).json({ success: true, message: 'Email verified successfully. You can now login.' });
  } catch (error) {
    console.error('Error in verifyOTP:', error.message);
    res.status(500).json({ success: false, message: 'Error verifying OTP', error: error.message });
  }
};

// Resend OTP for account verification
const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide email"
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User is already verified"
      });
    }

    // Generate new OTP
    const otp = emailService.generateOTP();
    const otpExpiryTime = new Date();
    otpExpiryTime.setMinutes(otpExpiryTime.getMinutes() + 10); // OTP valid for 10 minutes

    // Update user with new OTP
    user.otp = {
      code: otp,
      expiresAt: otpExpiryTime
    };
    await user.save();

    // Send OTP via email
    const emailSent = await emailService.sendOTP(email, otp);
    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to send verification email"
      });
    }

    res.status(200).json({
      success: true,
      message: "A new verification code has been sent to your email"
    });
  } catch (error) {
    console.error("Error in resendOTP:", error.message);
    res.status(500).json({
      success: false,
      message: "Error resending OTP",
      error: error.message
    });
  }
};

// User Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      return res.status(401).json({ success: false, message: 'Please verify your email first' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      data: { id: user._id, username: user.username, email: user.email, experienceLevel: user.experienceLevel },
    });
  } catch (error) {
    console.error('Error in loginUser:', error.message);
    res.status(500).json({ success: false, message: 'Error logging in', error: error.message });
  }
};

// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({ email }).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error('Error in getUserProfile:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
};

// Get Saved Jobs
const getSavedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('savedJobs');
    res.json({ success: true, savedJobs: user.savedJobs });
  } catch (error) {
    console.error('Error in getSavedJobs:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Save a Job
const saveJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const user = await User.findById(req.user.id);

    if (!user.savedJobs.includes(jobId)) {
      user.savedJobs.push(jobId);
      await user.save();
    }

    res.json({ success: true, message: 'Job saved successfully' });
  } catch (error) {
    console.error('Error in saveJob:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Unsave a Job
const unsaveJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const user = await User.findById(req.user.id);

    user.savedJobs = user.savedJobs.filter(id => id.toString() !== jobId);
    await user.save();

    res.json({ success: true, message: 'Job removed from saved jobs' });
  } catch (error) {
    console.error('Error in unsaveJob:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Forgot Password - Send OTP
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide email"
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Generate new OTP
    const otp = emailService.generateOTP();
    const otpExpiryTime = new Date();
    otpExpiryTime.setMinutes(otpExpiryTime.getMinutes() + 10); // OTP valid for 10 minutes

    // Update user with new OTP
    user.resetPasswordOtp = {
      code: otp,
      expiresAt: otpExpiryTime
    };
    await user.save();

    // Send OTP via email
    const emailSent = await emailService.sendOTP(email, otp, "reset");
    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to send password reset email"
      });
    }

    res.status(200).json({
      success: true,
      message: "A password reset code has been sent to your email"
    });
  } catch (error) {
    console.error("Error in forgotPassword:", error.message);
    res.status(500).json({
      success: false,
      message: "Error sending password reset OTP",
      error: error.message
    });
  }
};

// Reset Password with OTP
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide email, OTP, and new password"
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Check if OTP exists and is valid
    if (!user.resetPasswordOtp || !user.resetPasswordOtp.code) {
      return res.status(400).json({
        success: false,
        message: "No OTP found. Please request a new one."
      });
    }

    // Check if OTP has expired
    if (user.resetPasswordOtp.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one."
      });
    }

    // Verify OTP
    if (user.resetPasswordOtp.code !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password and clear OTP
    user.password = hashedPassword;
    user.resetPasswordOtp = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful. You can now login with your new password."
    });
  } catch (error) {
    console.error("Error in resetPassword:", error.message);
    res.status(500).json({
      success: false,
      message: "Error resetting password",
      error: error.message
    });
  }
};

module.exports = {
  createUser,
  verifyOTP,
  resendOTP,
  loginUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  getSavedJobs,
  saveJob,
  unsaveJob,
};
