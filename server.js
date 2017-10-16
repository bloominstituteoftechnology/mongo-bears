const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const Bear = require('./models');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

// allow server to parse JSON bodies from POST/PUT/DELETE requests
server.use(bodyParser.json());


// TODO: write your server code here

server.post('/bears', (req, res) => {
  const { species, latinName } = req.body;
  if (!species || !latinName) {
    res.status(STATUS_USER_ERROR)
    .json({ error: 'Must include species and latinName in request body.' });
    return;
  }
  const newBear = new Bear({ species: species, latinName: latinName });
  newBear.save((err) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR)
      .json({ error: 'An internal server error occurred while saving.' });
      return;
    }
    res.json(newBear);
    return;
  });
});

server.get('/bears', (req, res) => {
  if (req.query.id) {
    Bear.findById(req.query.id, (err, aBear) => {
      if (err) {
        res.status(STATUS_SERVER_ERROR)
        .json({error: err});
        return;
      }
      res.json({ success: aBear });
    });
    return;
  }
  Bear.find((err, bears) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR)
      .json({ error: 'Internal server error occurred while searching for bears' });
    }
    res.json({ success: bears });
    return;
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
