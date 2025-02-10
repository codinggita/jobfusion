const mongoose = require('mongoose');

const savedJobSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  jobData: {
    type: Object,
    required: true
  }
});

const SavedJob = mongoose.model('SavedJob', savedJobSchema);

module.exports = SavedJob;
