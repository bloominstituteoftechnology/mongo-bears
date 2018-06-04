const mongoose = require('mongoose');

const BearSchema = new mongoose.Schema({
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

const bearsModel = mongoose.model('Bear', BearSchema);

module.exports = bearsModel;