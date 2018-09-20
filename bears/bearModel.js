const mongoose = require('mongoose');

// {
//     species: 'Grizzly Bear',
//     latinName: 'Ursus arctos horribilis',
//     createOn: Date.now();
// }

// Creating bear schema.
const BearSchema = new mongoose.Schema({
    species: {
        type: String,
        required: true,
        unique: true
    },
    latinName: {
        type: String,
        required: true
    },
    createOn: {
        type: Date,
        default: Date.now()
    }
});

// Generating bear model.
const bearsModel = mongoose.model('Bear', BearSchema);

module.exports = bearsModel;