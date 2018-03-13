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
  createdOn: {
    type: Date,
    required: true,
  },
});

BearSchema.pre('save', function (next) {
  if (!this.createdOn) this.createdOn = new Date;
  next();
})

const BearModel = mongoose.model('Bear', BearSchema);

module.exports = BearModel;