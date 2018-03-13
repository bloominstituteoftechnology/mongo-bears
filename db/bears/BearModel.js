const mongoose = require('mongoose');

const BearSchema = new mongoose.Schema({
  species: {
    type: String,
    required: true,
  },
  latinName: {
    type: String,
    required: true,
  },
  createdOn: {
    // type: String,
    // required: true,
    // default: new Date(),
    type: Date,
    default: Date.now
},
});

const BearModel = mongoose.model('Bear', BearSchema);

module.exports = BearModel;
