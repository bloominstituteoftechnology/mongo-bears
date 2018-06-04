const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bearsSchema = new Schema({
  species: { type: String, required: true, unique: true },
  latinName: { type: String, required: true, unique: true },
  createdOn: { type: Date, default: Date.now() }
});

const Bear = mongoose.model('Bear', bearsSchema);

module.exports = Bear;