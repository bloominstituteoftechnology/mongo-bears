const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const Bear = require('./models.js');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

// allow server to parse JSON bodies from POST/PUT/DELETE requests
server.use(bodyParser.json());

// TODO: write your server code here

server.post('/bears', (req, res) => {
  // Ensure the client passes 'species' and 'latinName'.
  const { species, latinName } = req.body;
  if (!species || !latinName) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'You forgot to pass in the species and latin name' });
  }
  // Create and save a new Bear document.
  const bear = new Bear({ species, latinName });
  bear.save((err) => {
    if (err) {
      res.status(STATUS_USER_ERROR);
      res.json({ error: "Failed to save bear." });
    }
    res.json(bear);
  });
});

server.get(('/bears'), (req, res) => {
  Bear.find([], (err, data) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json({ error: "Server couldn't find bears" });
    }
    res.json(data);
  });
});

server.get(('/bears/:id'), (req, res) => {
  const { id } = req.params;
  Bear.findById(id, (err, data) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json({ error: "Couldn't find that id" });
    }
    res.json(data);
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
