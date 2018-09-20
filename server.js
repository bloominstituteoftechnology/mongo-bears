const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const bearController = require('./bears/bearController');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', function(req, res) {
  res.status(200).json({ api: 'running' });
});

server.use('/api/bears', bearController);

mongoose.Promise = global.Promise;
// Using Mongoose to connect API to the beardb database.
mongoose.connect('mongodb://localhost/dbBears', {}, err => {
  if (err) console.log(err);
  console.log('Mongoose connected us to our DB.');
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`\n=== API running on http://localhost:${port} ===\n`);
});