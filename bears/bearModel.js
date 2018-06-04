const mongoose = require('mongoose')

const localHost = 'localhost:27017';
const database = 'beardb';
mongoose
.connect(`mongodb://${localHost}/${database}`)
.then(res => 
  console.log("Successfully Connected to MongoDB")
)
.catch(error => {
  return console.log("Database connection failed")
})
const schema = new mongoose.Schema({
  species: {type: String, required: true},
  latinName: {type: String, required: true},
  createdOn: {Date}
})

const model = mongoose.model('Bear', schema)

module.exports = model