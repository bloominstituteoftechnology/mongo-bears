const mongoose = require('mongoose');

const BearSchema = new mongoose.Schema({
  species: {
    type: String
  },
  latinName: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Bears', BearSchema);
