const mongoose = require('mongoose');

const bearsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  species: {
    type: String,
    required: true,
    unique: false,
  },
});

/**
 * DEFINE: Collection and Documents' class-constructor.
 * Collection: -> 'BearsList'
 * Docmunents' class-constructor: Bear
 */
Bear = mongoose.model('bears_list', bearsSchema);
module.exports = Bear;
