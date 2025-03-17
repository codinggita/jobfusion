const mongoose = require('mongoose');

// Define the Job Schema
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    required: false
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'],
    required: true
  },
  experienceLevel: {
    type: String,
    enum: ['Entry-level', 'Mid-level', 'Senior', 'Executive'],
    required: true
  },
  applicationDeadline: {
    type: Date,
    required: false
  },
  postedDate: {
    type: Date,
    default: Date.now
  },
  externalJobId: {
    type: String,
    required: false
  },
  externalSource: {
    type: String,
    required: false
  },
  applicationUrl: {
    type: String,
    required: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create and export the Job model
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
