const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const Bears = require('./models');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

// allow server to parse JSON bodies from POST/PUT/DELETE requests
server.use(bodyParser.json());

// TODO: write your server code here
server.get('/bears', async (req, res) => {
  try {
    const bears = await Bears.find();
    return res.json(bears);
  } catch (error) {
    return res.status(STATUS_SERVER_ERROR).json({ error });
  }
});

server.post('/bears', async (req, res) => {
  const { species, latinName } = req.body;
  if (!species || !latinName) {
    return res
      .status(STATUS_USER_ERROR)
      .json({ error: 'You must supply a species and latin name' });
  }

  try {
    const newBear = await new Bears({ species, latinName }).save();
    return res.json(newBear);
  } catch (error) {
    return res.status(STATUS_SERVER_ERROR).json({ error });
  }
});

server.get('/bears/:id', async (req, res) => {
  try {
    const bear = await Bears.findById(req.params.id);
    return res.json(bear);
  } catch (error) {
    return res.status(STATUS_SERVER_ERROR).json({ error });
  }
});

mongoose.Promise = global.Promise;
const connect = mongoose.connect('mongodb://localhost/bears', {
  useMongoClient: true,
});

/* eslint no-console: 0 */
connect.then(
  () => {
    const port = 3000;
    server.listen(port);
    console.log(`Server Listening on ${port}`);
  },
  (err) => {
    console.log('\n************************');
    console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
    console.log('************************\n');
  },
);
