const mongoose = require('mongoose');

//Schema
const BearSchema = new mongoose.Schema({
    species: {
        type: String,
        required: true,
        unique: true,
    },
    latinName: {
        type: String,
        rewquired: true,
    },
    createOn: {
        type: Date,
        default: Date.now()
    }
});

//this ties with Schema and assign to bearModel which will become collections in database
const bearModel = mongoose.model('Bear', BearSchema);

//export the schema form as bearModel
module.exports = bearModel;