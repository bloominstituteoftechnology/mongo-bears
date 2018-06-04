const mongoose = require('mongoose');

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
        default: Date.now,
    },
};

const options = {
    timestamps: true
};


const bearSchema = new mongoose.Schema(definition, options);

const bearModel = mongose.model('Bear', bearSchema, 'bears');



//Create(.Post)


//Read(.get)

//Update(.put)

//Delete(destroy)(.delete)