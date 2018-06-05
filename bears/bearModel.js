const mongoose = require('mongoose');

const localhost = 'localhost:27017';
const database = 'beardb';


mongoose
  .connect(`mongodb://${localhost}/${database}`)
  .then(response => {
    console.log('Successfully connected to mongodb')
  })
  .catch(error => console.log('database connnection failed'));

const schema = new mongoose.Schema({
  species: {
    type: String,
    required: true
  },
  latinName: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now
  }
})

const model = mongoose.model('Bear', schema);

module.exports = model;
