const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const mongoose = require('mongoose');
const bearController = require('./bears/bearController');
const server = express();
const port = 5000;

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/api/bears', bearController);

server.get('/', function(req, res) {
  res.status(200).json({ api: 'running' });
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/', {}, err => {
  if(err) console.log(err);
  console.log(`Mongoose is connected to our DB.`); 
});

server.listen(port, () => {
  console.log(`\n=== API running on http://localhost:${port} ===\n`);
});