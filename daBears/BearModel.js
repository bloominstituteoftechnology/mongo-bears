const mongoose = require('mongoose');

const BearSchema = new mongoose.Schema({
  species: {
    type: String,
    required: true
  }, // String, required
  latinName: {
    type: String,
    required: true // String, required
  },
  createdOn: { type: Date, default: Date.now, required: true }
  // Date, required, defaults to current date
});

const BearModel = mongoose.model('daBears', BearSchema);

module.exports = BearModel;
