const mongoose = require('mongoose');

const date = new Date();

const BearSchema = new mongoose.Schema({
  species: { type: String, required: true },
  latinName: { type: String, required: true },
  createdOn: {
    type: Date,
    default: date.toDateString() + ' ' + date.toTimeString()
  }
});

const BearModel = mongoose.model('Bear', BearSchema);

module.exports = BearModel;
