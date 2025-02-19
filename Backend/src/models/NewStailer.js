const mongoose = require('mongoose');

const newStailerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  }
}, { collection: 'newstaileremails' });  // Set collection name explicitly

const NewStailer = mongoose.model('NewStailer', newStailerSchema);

module.exports = NewStailer;
