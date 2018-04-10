const mongoose = require('mongoose');

const bearSchema = new mongoose.Schema(
  {
    species: {
      type: String,
      required: true,
    },
    latinName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const bearModel = mongoose.model('Bear', bearSchema); // bears collection

module.exports = bearModel;
