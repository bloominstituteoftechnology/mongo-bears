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
 * DEFINE: Collection and Documents.
 * Collection: -> 'BearsList'
 * Docmunents: Create via the 'Bear class'
 */
Bear = mongoose.model('bears_list', bearsSchema);
module.exports = Bear;
