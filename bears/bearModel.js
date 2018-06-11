// create a model for our bears
const mongoose = require('mongoose');
//Scheema

// {
//     species: 'Grizzly Bear';
//     latinName: 'Ursaus Americanas';
//     createOn: Date.now();
// }

const BearSchema = new mongoose.Schema({
    species: {
        type: String,
        require: true,
        unique: true,
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

const bearsModel = mongoose.model('Bear', BearSchema);

module.exports = bearsModel;