const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  paymentId: {
    type: String,
  }
 
 
  
});

const membership = mongoose.model('membership', membershipSchema);

module.exports = membership;
