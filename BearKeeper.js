const mongoose = require('mongoose');

const BearKeeper = new mongoose.Schema({
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
        required: true,
    }
})