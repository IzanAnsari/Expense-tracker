const mongoose = require('mongoose');

const expenceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
  },
amount: {
  type: Number,
  required: true,
},
description: {
  type: String,
  required: true,
},

});



const expence= mongoose.model('expence', expenceSchema);

module.exports = expence;