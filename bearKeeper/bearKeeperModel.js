const mongoose = require('mongoose');

const BearKeeperSchema = mongoose.Schema({
  species: {
    type: String,
    required: true
  },
  latinName: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now()
  }
})

const BearKeeperModel = mongoose.model('BearKeeper', BearKeeperSchema);

module.exports = BearKeeperModel;
