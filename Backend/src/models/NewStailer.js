const mongoose = require('mongoose');

const newStailerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  }
});

const NewStailer = mongoose.model('NewStailer', newStailerSchema);

module.exports = NewStailer;
