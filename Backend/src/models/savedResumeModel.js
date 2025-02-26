const mongoose = require("mongoose");

const savedResumeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  resumeData: {
    type: Object, // Store the resumeData object as JSON
    required: true,
  },
  title: {
    type: String, // Resume title/name provided by the user
    required: true,
  },
  templateId: {
    type: String, // To identify which template the resume was created with
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SavedResume", savedResumeSchema);