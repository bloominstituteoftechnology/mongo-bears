const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const bearController = require('./bears/bearController');
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/api/bears', bearController);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:5000/beardb', {}, err => {
  if(err) console.log(err);
  console.log(`Mongoose is connected to our DB.`);
});

server.get('/', function(req, res) {
  res.status(200).json({ api: 'running' });
});

server.use('/api/bears', bearController);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`\n=== API running on http://localhost:${port} ===\n`);
});
