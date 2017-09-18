const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const Bears = require('./models.js');
const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

// allow server to parse JSON bodies from POST/PUT/DELETE requests
server.use(bodyParser.json());


server.post('/bears', (req, res) => {
  const { species, latinName } = req.body;
  if (!species || !latinName) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: "Missing species or latinName"});
    return;
  }
  const bear = new Bears({species, latinName});
  bear.save((err) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json({ error: "internal server error" });
      return
    }
    res.json(bear);
  });
});

server.get('/bears', (req, res) => {
  Bears.find({}, (err, data) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json({ error: "Internal server error"});
      return
    }
    res.json(data);
  });
});

server.get('/bears/:id', (req, res) => {
  const { id } = req.params;
  Bears.findById(id, (err, bear) => {
    if (err) {
      req.status(STATUS_SERVER_ERROR);
      res.json({ error: "Internal server error" });
      return;
    }
    res.json(bear);
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
