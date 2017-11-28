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

  // const newBear = new Bear(req.body);
  // // check the bear has all the data
  // newBear.save(function(err, bear) {
  //   if (err) {
  //     res.status(STATUS_SERVER_ERROR).json({ error: "Could not create bear."})
  //   } else {
  //     res.status(201).json(bear);
  //   }
  // });
  const { species, latinName } = req.body;
  if (!species || !latinName) {
    res.status(STATUS_USER_ERROR);
    res.json({error: 'Must provide species and latinName'});
    return;
  }

  const bear = new Bear({ species, latinName });
  bear.save((err) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json(err);
    } else {
      res.json(bear);
    }
  })
});

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

server.get('/bears/:id', function(req, res) {
  const { id } = req.params;
  Bear.findById(id, (err, bear) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json(err);
    } else{
      res.json(bear);
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
