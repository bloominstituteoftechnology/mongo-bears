const mongoose = require('mongoose');

const BearSchema = new mongoose.Schema({
  species: {
    type: String,
    required: true,
    unique: true
  },
  latinname: {
    type: String,
    required: true,
  },
  createdOn:{
    type: Date,
    default: Date.now()
  }
})


const bearModel = mongoose.model("bear", BearSchema)


module.exports = bearModel;
