const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require("mongoose");

const bearController = require('./bears/bearController');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', function(req, res) {
  res.status(200).json({ api: 'Testing my vs code' });
});

server.use('/api/bears', bearController);

const port = process.env.PORT || 5000;
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/dbBears", {}, err => {
  if(err) {
    console.log(err);
  } else {
    console.log("Mongoose connected us to our DB");
  }
});

server.listen(port, () => {
  console.log(`\n=== API running on http://localhost:${port} ===\n`);
});
