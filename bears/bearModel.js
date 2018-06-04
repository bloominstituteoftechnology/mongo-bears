const mongoose = require('mongoose');

const BearSchema = new mongoose.Schema({
  species: {
    type: String,
    required: true,
    unique: true,
  }, 

  latinName: {
    type: String,
    required: true,
  },
  createOn: {
    type: Date,
    default: Date.now()
  }
});

const bearsModel = mongoose.model('Bear', BearSchema);


module.exports = bearsModel;