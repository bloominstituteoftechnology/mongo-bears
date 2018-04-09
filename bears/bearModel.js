const mongoose = require('mongoose');

const bearSchema = new mongoose.Schema({
  species:{
    type:String,
    required:true,
  },
  latinName:{
    type:String,
    required:true,
  },
  createdOn:{
    type:Date,
    default:Date.now,
  },
});

const bearModel = mongoose.model('Bear',bearSchema);

module.exports = bearModel;
