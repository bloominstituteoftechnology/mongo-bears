const mongoose = require('mongoose');

//Schema 

// {
//     species: 'Grizzly Bear', 
//     latinName: 'Ursas Americanas',
//     createOn: Date.now();
// }

const BearSchema = new mongoose.Schema({
    species: {
        type: String,  //There are many more types in Mongoose
        required: true, // required is a validator.  It tells us that this field is required
        unique: true, //  Validator.  This field can only exist once; no repeats.
    },
    latinName: {
        type: String,
        required: true,
        unique: true
    },
    createOn: {
        type: Date, 
        default: Date.now()
    }
});

const bearsModel = mongoose.model('Bear', BearSchema); // this is where we declare this as a model. 
//by passing out BearSchema to this model we declare that it will be a collection in our DB

module.exports = bearsModel;