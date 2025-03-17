const mongoose = require('mongoose');

// User schema definition
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    experienceLevel: { 
      type: String, 
      required: true, 
      enum: ['Fresher', 'Experienced'],
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    otp: {
      code: { type: String },
      expiresAt: { type: Date }
    },
    resetPasswordOtp: {
      code: { type: String },
      expiresAt: { type: Date }
    }
  }, { timestamps: true });
  

// Export the model to be used elsewhere in the project
module.exports = mongoose.model('User', userSchema); // Collection name will be 'users'