const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BearSchema = new Schema({
  species: {
    type: String,
  },
  latinName: {
    type: String,
  },
  Created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Bears', BearSchema);