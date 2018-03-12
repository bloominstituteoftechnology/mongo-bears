// import { Mongoose } from 'mongoose';

const express = require('express');
const helmet = require('helmet');
const cors = require('cors'); // https://www.npmjs.com/package/cors
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Bear = require('./BearKeeper/BearModel');

const server = express();

server.use(helmet()); // https://helmetjs.github.io/
server.use(cors());   // https://medium.com/trisfera/using-cors-in-express-cac7e29b005b
server.use(bodyParser.json());

server.get('/', function(req, res) {
  res.status(200).json({ status: 'API Running' });
});

// server.use('/bears', bearRouter);
server.post('/api/bears', function(req, res) {
  const {
    bearInfo,
    species,
    latinName
   } = req.body;

  const bear = new Bear(bearInfo);

  
  if (!species || !latinName) {
    console.log(err);
    res.status(400).json({ error: 'Please provide both species and latinNAme for the Bear.' });
  } else {
    bear
      .save()
      .then(savedBear => {
        res.status(201).json(savedBear);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'There was an error while saving the Bear to the Database' });    
      });
  }
});

server.get('/api/bears', function(req, res) {
  Bear.find({})
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => {
      consolelog(err);
      res.status(500).json({ error: 'The information could not be retrieved.' });
    });
});

mongoose
  .connect('mongodb://localhost/BearKeeper')
  .then(connected => {
    console.log('Successfully Connected to MongoDB');
  })
  .catch(err => {
    console.log('Database connection failed');
  });


const port = process.env.PORT || 5005;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
});