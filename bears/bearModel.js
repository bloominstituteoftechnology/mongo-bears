//here we'll create a shape for all our documents that come in. We will build a model for bears. 
const mongoose = require('mongoose');
//Schema

// {
//     species: 'Grizzly Bear', 
//     latinName: 'Urusas Americanas', 
//     createOn: Date.now();
// }

const BearSchema = new mongoose.Schema({
    species: {
        type: String,
        required: true,
        unique: true,
    },
    latinName: {
        type: String,
        required: true,
    }, 
    createdOn: {
        type: Date, 
        default: Date.now()
    }
});

//modal in schema land of what our collection will look like
// collection will be what our model is called

const bearsModel = mongoose.model('Bear', BearSchema); //lowercase 'Bear'

module.exports = bearsModel;