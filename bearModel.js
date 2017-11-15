const mongoose = require('mongoose');
const BearSchema = new mongoose.Schema({
  species: {
    type: String,
    required: true
  },
  latinName: {
    type: String, 
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Bear', BearSchema);