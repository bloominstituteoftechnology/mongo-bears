const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://localhost/beardb', {}, error => {
  error
    ? console.log('Database connection failed', error)
    : console.log('Successfully Connected to MongoDB');
});