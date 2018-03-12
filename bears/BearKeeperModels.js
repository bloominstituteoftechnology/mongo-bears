const mongoose = require('mongoose');

const BearKeeperSchema = new mongoose.Schema({
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
        default: new Date()
    }
});

const BearKeeperModel = mongoose.model('BearKeeper', BearKeeperSchema);

module.exports = BearKeeperModel;