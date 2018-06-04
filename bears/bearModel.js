const mongoose = require('mongoose');

const bearSchema = new mongoose.Schema({
  species: {
    type: String,
    required: true,
  },
  latinName: {
    type: String,
    required: true,
    maxlength: 8,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    index: true,
    required: true,
    default: 'Not Provided',
  },
  age: {
    type: Number,
    min: 0,
    max: 50,
    default: 0,
  },
  tag: {
    type: String,
  },
  items: [{ number: Number, name: String, price: Number }],
});

const bearModel = mongoose.model('Bear', bearSchema); // bears collection

module.exports = bearModel;
