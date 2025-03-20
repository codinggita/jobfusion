const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  job_title: {
    type: String,
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  salary_range: {
    type: String,
    required: false,
  },
  journey_description: {
    type: String,
    required: false,
  },
  image_url: {
    type: String,
    required: false,
  },
});

// Create a model based on the schema
const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;
