const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const Bear = require('./models');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

// allow server to parse JSON bodies from POST/PUT/DELETE requests
server.use(bodyParser.json());
server.get('/bears', (req, res) => {
  Bear.find({}, (err, bears) => {
    if (err) { return res.status(STATUS_SERVER_ERROR).json(err); }
    res.json(bears);
  });
});

server.post('/bears', (req, res) => {
  const { species, latinName } = req.body;
  const bear = new Bear({ species, latinName });
  bear.save((err, newBear) => {
    if (err) {
      return res.status(STATUS_USER_ERROR).json(err);
    }
    res.json(newBear);
  });
});

server.get('/bears/:id', (req, res) => {
  Bear.findById(req.params.id, (err, foundBear) => {
    if (err) return res.status(STATUS_USER_ERROR).json(err);
    res.json(foundBear);
  });
});

server.delete('/bears/:id', (req, res) => {
  Bear.remove({ _id: req.params.id }, (err) => {
    if (err) return res.status(STATUS_USER_ERROR).json(err);
    res.json({ success: true });
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
});
