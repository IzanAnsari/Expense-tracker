const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  
  email: {
    type: String,
    required: true,
    
  },
  phnumber: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const contact = mongoose.model('contact', contactSchema);

module.exports = contact;
