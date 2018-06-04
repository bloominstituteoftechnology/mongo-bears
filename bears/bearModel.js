const mongoose = require('mongoose');

const BearSchema = new mongoose.Schema({
    species: {
        type: String,
        required: true,
        unique: true
    },
    latinName: {
        type: String,
        require: true,
    },
    createOn: {
        type: Date,
        default: Date.now()
    }
});

const bearModel = mongoose.model('Bear', BearSchema);

module.exports = (bearModel);