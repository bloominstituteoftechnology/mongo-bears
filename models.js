const mongoose = require('mongoose');

// a schema is a description of the format of the docs within a collection
// in other words, we are about to lay out what info we need and what form in needs to be in
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
