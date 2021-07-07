const mongoose = require("mongoose");

// const bearSchema = mongoose.Schema({
//   species: {
//     type: String, //type available in Mongoose
//     required: true, //means you must have this
//     unique: true //validator so we only use each value once only
//   },
//   latinName: {
//     type: String,
//     required: true
//   },
//   createOn: {
//     type: Date, //another type of type
//     default: Date.now()
//   }
// });

// const bearsModel = mongoose.model("Bear", bearSchema);

const definition = {
  species: {
    type: String,
    required: true,
    unique: true
  },
  latinName: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now()
  }
};

const options = {
  timestamps: true
};

const bearSchema = new mongoose.Schema(definition, options);

const bearModel = mongoose.model("Bear", bearSchema, "bears");
//the three parameters are - model name, schema to be used, collection name

module.exports = bearModel;
