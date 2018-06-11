const mongoose = require("mongoose");

const definition = {
    species: {
        type: String,
        required: true
    }, // String, required
    latinName: {
        type: String,
        required: true
    },  // String, required
    createdOn: {type: Date,
    default: Date.now // Date, required, defaults to current date
    }
  };

const options = {
    timestamps: true //updates timestamp every time its updated
};

const bearSchema = new mongoose.Schema(definition, options);

const bearModel = mongoose.model("Bear", bearSchema, 'bears');

module.exports = bearModel;