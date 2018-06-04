// create model for our bears
const mongoose = require('mongoose');
// Schema

// 
//     species: 'Grizzlie Bear',
//         latinName: 'Ursas Americanas',
//         createdOn: Date.now();    
// 

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
    createOn: {
        type: Date,
        default: Date.now()
    }
})

const bearsModel = mongoose.model('Bear', BearSchema);

module.export = bearsModel;