const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();
const Bear = require('./BearModel.js')

// allow server to parse JSON bodies from POST/PUT/DELETE requests
server.use(bodyParser.json());






// TODO: write your server code here
server.post('/api/bears', function (req, res) {
  const newBear = new Bear(req.body);
  
  newBear.save(function(err, bear) {
    if(err) {
      res.status(STATUS_SERVER_ERROR).json({ error: 'Some useful error message '});
    } else {
      res.status(200).json(bear);
    }
  });
});

server.get('/api/bears', function(req, res) {
  Bear.find({}, function(err, bears) {
    if(err) {
      res.status(404);
    } else {
      res.status(200).json(bears);
    }
  });
});

server.get('/api/bears/:id', function(res, req) {
  const { id } = req.params;
  Bear.findById({ _id: id }, function(err, bears) {
    if(err) {
      res.status(404);
    } else {
      res.status(200).json(bears);
    }
  });
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
