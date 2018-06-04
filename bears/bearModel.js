const mongoose = require("mongoose");

const bearSchema = new mongoose.Schema({
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
});

const Bear = mongoose.model("Bear", bearSchema);

module.exports(Bear);
