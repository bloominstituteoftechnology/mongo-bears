const mongoose = require('mongoose');

const BearSchema = new mongoose.Schema({
 species: {
   type: String,
   required: true,
 },
 latinName: {
   type: String,
 },
 createdOn: {
   type: Date,
   timestamp: Date.now,
 }
});

const BearModel = mongoose.model('Bears', BearSchema);

module.exports = BearModel;