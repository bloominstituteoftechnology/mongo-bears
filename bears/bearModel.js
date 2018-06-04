const mongoose = require('mongoose');


//schema

// {
//   species: 'Bear Species',
//   latinName: 'latinName',
//   createOn: Date.now();
// }

const BearSchema = new mongoose.Schema({ // sets schema

  species: {
    type: String,
    required: true,
    unique: true
  },
  latinName: {
    type: String,
    require: true
  },
  createOn: {
    type: Date,
    default: Date.now()
  }
});

const bearsModel = mongoose.model('Bear', BearSchema); // declare BearsModel as a model with mongoose

module.exports = bearsModel;