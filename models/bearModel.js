const mongoose = require('mongoose');

const BearSchema = new mongoose.Schema({
  species: String,
  latinName: String,
  createdOn: { type: Date, default: Date.now }
});

const BearModel = mongoose.model('Bear', BearSchema);

module.exports = BearModel;
