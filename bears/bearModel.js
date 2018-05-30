const mongoose = require('mongoose');

const definition = {
    species: {
        type: String,
        required: true,
    },
    latinName: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    }
};

const options = {
    timestamps: true
};

const bearSchema = new Mongoose.Schema(definition, options);

// could've just done mongoose.model('Bear', bearSchema)
const bearModel = mongoose.model('Bear', bearSchema, bears);

module.exports = bearModel;