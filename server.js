const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const Bear = require('./Models.js');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

// allow server to parse JSON bodies from POST/PUT/DELETE requests
server.use(bodyParser.json());

// TODO: write your server code here

server.post('/api/bears', (req, res) => {
  const newBear = new Bear(req.body);
  
  newBear.save((error, bear) => {
    if(error) {
      res.status(STATUS_USER_ERROR).json({ error });
    } else {
      res.status(201).json(bear);
    }
  });
});
server.get('/api/bears/', (req, res) => {
  Bear.find({}, (err, bears) => {
    if(err) {

    } else {
      res.status(200).json(bears);
    }
  });
});

server.get('/api/bears/:id', (req, res) => {
  const { id } = req.params;
  
  Bear.findOne({ _id: id }, function(err, bears) {
    if(err) {

    } else {
      res.status(200).json(bears);
    }
  })
});

mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/bears',
  { useMongoClient: true }
);

/* eslint no-console: 0 */
connect.then(() => {
  const port = 3000;
  server.listen(port);
  console.log(`Server Listening on ${port}`);
}, (err) => {
  console.log('\n************************');
  console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
  console.log('************************\n');
});
