const mongoose = require('mongoose');

const BearSchema = new mongoose.Schema({
    species: {
        type: String,
        required: [true, 'Please provide both species and latinName for the Bear.'],
    },
    latinName: {
        type: String,
        required: [true, 'Please provide both species and latinName for the Bear.'],
    },
    createdOn: {
        type: String,
        required: true,
        default: new Date(),
    }
});

// BearSchema.post('save', function(err, doc, next) {
//     console.log(err);
// });

module.exports = mongoose.model('Bear', BearSchema);