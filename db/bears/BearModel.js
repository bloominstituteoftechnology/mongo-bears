const mongoose = require('mongoose');

const BearSchema = new mongoose.Schema({
  speacies: {
    type: String,
    required: true,
  },
  latinName: {
    type: String,
    required: true,
  },
  createdOn: { 
    type: Date,
    default: Date.now
},
});

const BearModel = mongoose.model('Bear', BearSchema);

module.exports = BearModel;
