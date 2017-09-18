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
  const { species, latinName } = req.body;
  if (!species || !latinName) {
    res.status(STATUS_USER_ERROR).send({ error: 'Please enter the required information to save a Bear.' });
  } else {
    const newBear = new Bear({ species, latinName });
    newBear.save((err, bear) => {
      if (err) res.status(STATUS_SERVER_ERROR).send({ error: 'Something went wrong on the server trying to save your bear.' });
      res.status(200).send(bear);
    });
  }
});

server.get('/bears', (req, res) => {
  Bear
    .find()
    .exec((err, bears) => {
      if (err) res.status(STATUS_SERVER_ERROR).send({ error: 'Something went wrong on the server trying to retrieve your bears.' });
      res.status(200).send(bears);
    });
});

server.get('/bears/:id', (req, res) => {
  Bear
    .findById(req.params.id)
    .exec((err, bear) => {
      if (err) res.status(STATUS_SERVER_ERROR).send({ error: 'Could not locate your bear.' });
      res.status(200).send(bear);
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
