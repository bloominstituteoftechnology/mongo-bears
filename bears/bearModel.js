const mongoose = require('mongoose');

// {
//     species: 'Grizzly Bear',
//     latinName: 'Ursus arctos horribilis',
//     createOn: Date.now();
// }

// Creating bear schema for the bears collection.
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

// Using Mongoose to generate a bear model that can be used to perform CRUD operations on bear documents.
const bearsModel = mongoose.model('Bear', BearSchema);

module.exports = bearsModel;