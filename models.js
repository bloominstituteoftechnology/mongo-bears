const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Bear = new Schema({
  species: {
    type: String,
  },
  latinName: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model('bear', Bear);
