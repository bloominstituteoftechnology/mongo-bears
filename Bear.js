const mongoose = require('mongoose');

const BearSchema = new mongoose.Schema({
  species: {
    type: String,
    require: true,
  },
  latinName: {
    type: String,
    require: true,
  },
  createdOn: {
    type: Date,
    require: true,
  },
});

const BearModel = mongoose.model('Bear', BearSchema);

module.exports = BearModel;
