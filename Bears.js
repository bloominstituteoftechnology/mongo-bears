const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Bear = new Schema({
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
        default: new Date(),
    }
})

module.exports = mongoose.model("Bears", Bear);