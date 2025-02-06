// models/SavedJob.js
const mongoose = require("mongoose");

const SavedJobSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true,
  },
  job: {
    // Stores the full job object from Adzuna
    type: Object,
    required: true,
  },
  savedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SavedJob", SavedJobSchema);
