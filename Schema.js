const mongoose = require('mongoose');

let idCounter = 0;
const BearSchema = new mongoose.Schema({
	species: {
	  type: String,
		required: true,
	},
	latinName: {
	   type: String,
		 required: true,
	 },
	createdOn: {
	  type: Date,
		required: true,
		default: Date.now(),
   },
    id: {
     type: Number,
		 required: true,
		 default: idCounter++,
		},
});

const BearModel = mongoose.model('Bear', BearSchema);

module.exports = BearModel; 
