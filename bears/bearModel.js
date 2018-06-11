//Bear schema
const mongoose = require('mongoose');

// const definition = {
//     species: 'Sloth Bear', //String, required
//     scientificName: 'Melursus Ursinus', //String, required
//     createOn: Date.now() //Date, required
// }

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
        deafult: Date.now,
    },
};

const options = {
    timestamps: true
};

const bearSchema = new mongoose.Schema(definition, options);

const bearModel = mongoose.model('Bear', bearSchema, 'bears');

module.exports = bearModel;