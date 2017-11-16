const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const Bear = require('./models.js')

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

// allow server to parse JSON bodies from POST/PUT/DELETE requests
server.use(bodyParser.json());

// TODO: Write your code here
server.get('/api/bears', function(req, res) {
  Bear.find({}, function(err, bears) {
    if(err) {
      res.status(STATUS_SERVER_ERROR).json({ error: 'cannot get bears' })
    } else {
      res.status(200).json(bears);
    }
  }) 
});

server.get('/api/bears/:id', function(req, res) {
  const { id } = req.params;

  Bear.findById(id, function(err, bears) {
    if(err) {
      res.status(STATUS_SERVER_ERROR).json({ error: 'cannot get bears' })
    } else {
      res.status(200).json(bears);
    }
  }) 
});

server.post('/api/bears', (req, res) => {
  const newBear = new Bear(req.body);

  newBear.save(function(err, bear) {
    if(err) {
      res.status(STATUS_SERVER_ERROR).json({ error: 'cannot save bears' })
    } else {
      res.status(200).json(bear)
    }
  });
});









// plumbing
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
