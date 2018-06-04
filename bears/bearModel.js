const mongoose = require("mongoose");

const BearSchema = mongoose.Schema({
  species: {
    type: String, //type available in Mongoose
    required: true, //means you must have this
    unique: true //validator so we only use each value once only
  },
  latinName: {
    type: String,
    required: true
  },
  createOn: {
    type: Date, //another type of type
    default: Date.now()
  }
});

const bearsModel = mongoose.model("Bear", BearSchema);

module.exports = bearsModel;
