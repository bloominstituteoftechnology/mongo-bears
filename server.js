const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const localhost = 'localhost:27017';
const database = 'beardb';

// mongoose
//   .connect(`mongodb://${localhost}/${database}`)
//   .then(response => {
//     console.log('Successfully connected to mongodb')
//   })
//   .catch(error => console.log('database connnection failed'));

// const schema = new mongoose.Schema({
//   species: { type: String, required: true },
//   latinName: { type: String, required: true },
//   createdOn: {
//     type: Date,
//     required: true,
//     default: Date.now
//   }
// })

// const model = mongoose.model('Bear', schema);

const bearController = require('./bears/bearController');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', function(req, res) {
  res.status(200).json({ api: 'running' });
});

server.use('/api/bears', bearController);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`\n=== API running on http://localhost:${port} ===\n`);
});

