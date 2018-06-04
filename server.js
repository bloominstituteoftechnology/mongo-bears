const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const bearController = require('./bears/bearController');
//we pull in out routes as controller

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', function(req, res) {
  res.status(200).json({ api: 'running' });
});

server.use('/bears', bearController);

const port = process.env.PORT || 5000;

mongoose.Promise = global.Promise; // configure the mongoose promise system to use Native JS Promises

mongoose.connect(
  "mongodb://localhost/dbBears",
  {},
  err => {
    // declare where we're going to connect this is the equivilent of using `use dbBears` in the mongo shell
    if (err) console.log(err);
    console.log("Mongoose connected us to our DB");
  }
);

server.listen(port, () => {
  console.log(`\n=== API running on http://localhost:${port} ===\n`);
});
