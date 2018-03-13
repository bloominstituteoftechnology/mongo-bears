const mongoose = require('mongoose');

const BearSchema = new mongoose.Schema({
  species: {
    type: String,
    required: "Please provide both species and latinName for the Bear.",
  },
  latinName: {
    type: String,
    required: "Please provide both species and latinName for the Bear.",
  },
},
{
  timestamps: { createdAt: 'createdOn'}
}
);

const BearModel = mongoose.model('Bear', BearSchema);

module.exports = BearModel;
