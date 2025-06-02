const mongoose = require('mongoose');

const savedJobSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true
  },
  jobData: {
    type: Object,
    required: true
  }
}, {
  timestamps: true
});

// Create compound index for email and jobData.id to prevent duplicates
savedJobSchema.index({ email: 1, 'jobData.id': 1 }, { unique: true });

const SavedJob = mongoose.model('SavedJob', savedJobSchema);

module.exports = SavedJob;
