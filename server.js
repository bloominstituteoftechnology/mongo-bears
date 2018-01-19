const bodyParser = require('body-Parser');
// wtf does bodyParser do - parse incoming request bodies in a middleware before your handlers
// what exactly does that mean?
// translates HTTP, turns it into a JS object
const express = require('express');
const mongoose = require('mongoose');

const Bear = require('./models');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = espress();

server.use(bodyParser.json());
// globalware allows server to parse JSON bodies from POST/PUT/DELETE requests

server.get('/bears', (req, res) => {
  Bear.find({}, (err, bears) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json(err);
    } else {
      res.json(bears);
    }
  });
});

server.get('/bears/:id', (req, res) => {
  const { id } = req.params;
  Bear.findById(id, (err, bear) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json(err);
    }
  });
});

server.post('/bears', (req, res) => {
  const { species, latinName } = req.body;
  if (!species || !latinName) {
    res.status(STATUS_USER_ERROR);
    res.jsonres.json({ error: 'Must provide species and latinName' });
    return;
  }
});

const Bear = new Bear({ species, latinName });
bear.save(err => {
  if (err) {
    res.status(STATUS_SERVER_ERROR);
    res.json(err);
  } else {
    res.json(bear);
  }
});

mongoose.Promise = global.Promise;
const connect = mongoose.connect('mongodb://localhost/bears');

connect.then(
  () => {
    const port = 3000;
    server.listen(port);
  },
  err => {
    console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
  }
);
