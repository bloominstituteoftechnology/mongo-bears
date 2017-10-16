const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();
const Bears = require('./models.js');

// allow server to parse JSON bodies from POST/PUT/DELETE requests
server.use(bodyParser.json());

// TODO: write your server code here

mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost:27017/bears',
  { useMongoClient: true }
);

server.get('/bears', (req, res) => {
  Bears.find({}, (err, bears) => {
    if (err) throw err;
    res.json(bears);
  });
});

server.get('/bears/:id', (req, res) => {
  const { id } = req.params;
  Bears.findById(id, (err, bear) => {
    if (err) throw err;
    res.json(bear);
  });
});

server.post('/bears', (req, res) => {
  const { species, latinName } = req.body;
  if (!species) {
    res.status(STATUS_USER_ERROR).json({ error: 'you must provide a species' });
    return;
  }
  if (!latinName) {
    res.status(STATUS_USER_ERROR).json({ error: 'you must provide a latinName' });
    return;
  }
  const bear = new Bears({ species, latinName });
  bear.save((err) => {
    if (err) throw err;
    res.json(bear);
  });
});

/* eslint no-console: 0 */
connect.then(() => {
  const port = 3000;
  server.listen(port);
  console.log(`Server Listening on ${port}`);
}, (err) => {
  console.log(err);
  console.log('\n************************');
  console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
  console.log('************************\n');
});
