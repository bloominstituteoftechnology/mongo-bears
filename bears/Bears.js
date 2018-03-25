const mongoose = require('mongoose');
const BearSchema = new mongoose.Schema ({
  species: {
    type: String,
    required: true
  },
  latinName: {
    type: String,
    required: true
  },
  creationDate: {
    type: String,
    required: true
  }
});

const BearModel = mongoose.model('Bears', BearSchema);

module.exports = BearModel;
