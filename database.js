const mongoose = require('mongoose');
const config = require('./config.js');

const { dbuser, dbpassword, dbname } = config.secret
// console.log(config.secret)

const server = `mongodb://${dbuser}:${encodeURIComponent(dbpassword)}@ds016718.mlab.com:16718/${dbname}`

// connect db
mongoose.connect(server)
    .then(() => console.log('Successfully Connected to MongoDB'))
    .catch(err => console.log('Database connection failed: ', err))

// define schema
const schema = new mongoose.Schema({
    species: { type: String, required: true },
    latinName: { type: String, required: true },
    createdOn: { type: Date, required: true, default: Date.now }
})

// export model
module.exports = mongoose.model('Bear', schema)
