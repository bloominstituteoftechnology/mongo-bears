// model for bears
const mongoose = require('mongoose');

// Schema
const BearSchema = new mongoose.Schema({
    species: {
        type: String,
        require: true,
        unique: true
    },
    latinName: {
        type: String,
        require: true
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
});

const bearsModel = mongoose.model('Bear', BearSchema)

module.export = bearsModel;
