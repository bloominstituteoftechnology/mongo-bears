 const mongoose = require ('mongoose');
 
 
 
//  
const definition = {
  species: {
    type: String,
    required: true,
  },
  latinName: {
    type: String,
    default: true,
  },
  createdOn: {
    type: String,
    default: Date.now,
  },
};
const options = {
  timestamps:true
}

const bearSchema = new mongoose.Schema( definition, options );
const bearModel = mongoose.model( 'Bear', bearsSchema, 'bears' );
module.exports = bearModel;
