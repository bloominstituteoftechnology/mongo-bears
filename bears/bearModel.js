const mongoose =  require('mongoose');

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
    createdOn: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

const bearModel = mongoose.model('Bear', BearSchema);

module.exports = bearModel;