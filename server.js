const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

// allow server to parse JSON bodies from POST/PUT/DELETE requests
server.use(bodyParser.json());

// TODO: DONE - write your server code here

// get Bear model
const Bear = require('./models');

// POST /bears -- accepts bear
server.post('/bears', (req, res) => {
  const newBear = new Bear(req.body);
  newBear.save()
    .catch(error => res.status(500).json({ error }))
    .then(result => res.json(result));
});

// GET /bears -- returns bears object
server.get('/bears', (req, res) => {
  Bear.find()
    .catch(error => res.status(500).json({ error }))
    .then(bears => res.json(bears.reduce((obj, bear) => {
      obj[bear.id] = bear;
      return obj;
    }, {})));
});

// GET /bears/:id -- expect id parameter on url, return bear
server.get('/bears/:id', (req, res) => {
  Bear.findById(req.params.id)
    .catch(error => res.status(500).json({ error }))
    .then(bear => res.json(bear));
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
