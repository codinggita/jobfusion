const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateOTP, sendOTP } = require('../utils/emailService');

// User Registration with OTP
const createUser = async (req, res) => {
    try {
        const { username, email, password, experienceLevel } = req.body;

        // Check if all required fields are provided
        if (!username || !email || !password || !experienceLevel) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields: username, email, password, experienceLevel"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            if (existingUser.isVerified) {
                return res.status(400).json({
                    success: false,
                    message: "Email already in use"
                });
            } else {
                // User exists but is not verified, we'll update their details and send a new OTP
                const otp = generateOTP();
                const otpExpiryTime = new Date();
                otpExpiryTime.setMinutes(otpExpiryTime.getMinutes() + 10); // OTP valid for 10 minutes

                // Hash the password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                // Update user with new details and OTP
                existingUser.username = username;
                existingUser.password = hashedPassword;
                existingUser.experienceLevel = experienceLevel;
                existingUser.otp = {
                    code: otp,
                    expiresAt: otpExpiryTime
                };

                await existingUser.save();

                // Send OTP via email
                const emailSent = await sendOTP(email, otp);
                if (!emailSent) {
                    return res.status(500).json({
                        success: false,
                        message: "Failed to send verification email"
                    });
                }

                return res.status(200).json({
                    success: true,
                    message: "A new verification code has been sent to your email",
                    data: { email }
                });
            }
        }

        // Generate OTP
        const otp = generateOTP();
        const otpExpiryTime = new Date();
        otpExpiryTime.setMinutes(otpExpiryTime.getMinutes() + 10); // OTP valid for 10 minutes

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user with the hashed password and OTP
        const newUser = await User.create({ 
            username, 
            email, 
            password: hashedPassword, 
            experienceLevel,
            otp: {
                code: otp,
                expiresAt: otpExpiryTime
            }
        });

        // Send OTP via email
        const emailSent = await sendOTP(email, otp);
        if (!emailSent) {
            return res.status(500).json({
                success: false,
                message: "Failed to send verification email"
            });
        }

        res.status(201).json({
            success: true,
            message: "User created successfully. Please verify your email with the OTP sent.",
            data: { email: newUser.email }
        });
    } catch (error) {
        // Handle duplicate key error
        if (error.code === 11000) {
            const duplicateKey = Object.keys(error.keyValue)[0]; // e.g., 'username' or 'email'
            return res.status(400).json({
                success: false,
                message: `Duplicate value error: The ${duplicateKey} '${error.keyValue[duplicateKey]}' is already taken.`,
            });
        }

        // Handle other errors
        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                error: error.message,
            });
        }

        console.error("Error in createUser:", error.message);
        res.status(500).json({
            success: false,
            message: "Error creating user",
            error: error.message,
        });
    }
};

// Verify OTP for account verification
const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and OTP"
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
        if (!user.otp || !user.otp.code) {
            return res.status(400).json({
                success: false,
                message: "No OTP found. Please request a new one."
            });
        }

        // Check if OTP has expired
        if (user.otp.expiresAt < new Date()) {
            return res.status(400).json({
                success: false,
                message: "OTP has expired. Please request a new one."
            });
        }

        // Verify OTP
        if (user.otp.code !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        // Mark user as verified and clear OTP
        user.isVerified = true;
        user.otp = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Email verified successfully. You can now login."
        });
    } catch (error) {
        console.error("Error in verifyOTP:", error.message);
        res.status(500).json({
            success: false,
            message: "Error verifying OTP",
            error: error.message
        });
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
        const otp = generateOTP();
        const otpExpiryTime = new Date();
        otpExpiryTime.setMinutes(otpExpiryTime.getMinutes() + 10); // OTP valid for 10 minutes

        // Update user with new OTP
        user.otp = {
            code: otp,
            expiresAt: otpExpiryTime
        };
        await user.save();

        // Send OTP via email
        const emailSent = await sendOTP(email, otp);
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

// User Login (updated to check for verification)
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide both email and password"
            });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Check if user is verified
        if (!user.isVerified) {
            return res.status(401).json({
                success: false,
                message: "Please verify your email before logging in",
                needsVerification: true,
                email: user.email
            });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // If everything is correct, send a success response with the token
        res.status(200).json({
            success: true,
            message: "Login successful",
            token: token,
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
                experienceLevel: user.experienceLevel,
            },
        });

    } catch (error) {
        console.error("Error in loginUser:", error.message);
        res.status(500).json({
            success: false,
            message: "Error logging in",
            error: error.message,
        });
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

        // Generate OTP for password reset
        const otp = generateOTP();
        const otpExpiryTime = new Date();
        otpExpiryTime.setMinutes(otpExpiryTime.getMinutes() + 10); // OTP valid for 10 minutes

        // Update user with password reset OTP
        user.resetPasswordOtp = {
            code: otp,
            expiresAt: otpExpiryTime
        };
        await user.save();

        // Send OTP via email
        const emailSent = await sendOTP(email, otp, true); // true for password reset
        if (!emailSent) {
            return res.status(500).json({
                success: false,
                message: "Failed to send password reset email"
            });
        }

        res.status(200).json({
            success: true,
            message: "Password reset code has been sent to your email"
        });
    } catch (error) {
        console.error("Error in forgotPassword:", error.message);
        res.status(500).json({
            success: false,
            message: "Error processing forgot password request",
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

        // Check if reset password OTP exists and is valid
        if (!user.resetPasswordOtp || !user.resetPasswordOtp.code) {
            return res.status(400).json({
                success: false,
                message: "No reset code found. Please request a new one."
            });
        }

        // Check if OTP has expired
        if (user.resetPasswordOtp.expiresAt < new Date()) {
            return res.status(400).json({
                success: false,
                message: "Reset code has expired. Please request a new one."
            });
        }

        // Verify OTP
        if (user.resetPasswordOtp.code !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid reset code"
            });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password and clear reset password OTP
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

// Get User Profile by Email
const getUserProfile = async (req, res) => {
    try {
        const { email } = req.params; // Fetch email from request params

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        const user = await User.findOne({ email }).select("-password"); // Exclude password

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error("Error in getUserProfile:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
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
};
