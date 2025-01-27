const bcrypt = require('bcryptjs'); // Required for hashing passwords
const User = require('../models/User'); // Make sure the User model is correctly imported

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
  
      // Attempt to create a new user
      const newUser = await User.create({ username, email, password, experienceLevel });
  
      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: newUser,
      });
    } catch (error) {
      // Handle duplicate key error
      if (error.code === 11000) {
        const duplicateKey = Object.keys(error.keyValue)[0]; // Get the duplicate key (e.g., 'username' or 'email')
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
  
module.exports = { createUser };
