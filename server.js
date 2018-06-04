const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const bearController = require('./bears/bearController');// pull in our Routes as controller

const server = express();

server.use(helmet());// helment adds a layer of security to our API
server.use(cors());
server.use(express.json());

server.get('/', function(req, res) {
  res.status(200).json({ api: 'running' });
});

server.use('/api/bears', bearController);// this is where we register our routes. EVERYthing on that bearControler will link up to the address of 'api/bears'

mongoose.Promise = global.Promise;// configure the mongoose promise to use Native JS Promises
mongoose.connect('mongodb://localhost/dbBears', {}, err => {
  if (err) console.log(err);
  console.log('Mongoose connected us to our DB');
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`\n=== API running on http://localhost:${port} ===\n`);
});
