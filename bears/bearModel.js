const mongoose = require('mongoose');

const bearSchema = new mongoose.Schema({
  species: {
    type: String,
    required: true,
    unique: true
  },
  latinName: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now()
  }
});

const Bear = mongoose.model('Bear', bearSchema);

module.exports = Bear;