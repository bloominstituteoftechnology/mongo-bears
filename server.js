const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const Bear = require('./models.js');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

server.use(bodyParser.json());

mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/bears',
  { useMongoClient: true }
);

server.get('/bears', (req, res) => {
  Bear.find({}, (err, bears) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json(err);
    }
    res.json(bears);
  });
});

server.get('/bears/:id', (req, res) => {
  const { id } = req.params;
  Bear.findById(id, (err, bear) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json(err);
    }
    res.json(bear);
  });
});

server.post('/bears', (req, res) => {
  const { species, latinName } = req.body;
  if (!species || !latinName) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please provide the bear\'s species and Latin name' });
    return;
  }
  const bear = new Bear({ species, latinName });
  bear.save((err) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json(err);
    }
    res.json(bear);
  });
});

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
