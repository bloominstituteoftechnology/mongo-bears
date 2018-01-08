const express = require('express');
const mongoose = require('mongoose');

const Bear = require('./BearModel.js')
const bodyParser = require('body-parser');
const server = express();

server.use(bodyParser.json());

server.get('/', (req, res) => {
  res.status(200).json({ message: 'API running'});
});

server.post('/api/bears', (req, res) => {
  const bearInformation = req.body;

  if(!bearInformation.species || !bearInformation.latinName) {
    res.status(400).json({error: "Please provide both species and latinName for the bear"})
  } else {
    const bear = new Bear(bearInformation);

  bear.save()
    .then(function(newBear) {
      res.status(201).json(newBear);
    })
    .catch(function(error) {
      res.status(500).json({errorMessage: "There was an error while save the bear to the Database"})
    });
  }

});

server.get('/api/bears', (req, res) => {
  Bear.find({})
    .then(function(bears) {
      res.status(200).json(bears);
    })
    .catch(function() {
      res
        .status(500)
        .json({ error: "the Infomation could not be retruved"});
    })
});

server.get('/api/bears/:id', (req, res) => {
  const { id } = req.params;

  Bear.findById(id)
    .then(function(bear) {
      res.status(200).json({bear})
    })
    .catch(function(error) {
      res.status(500).json({ error: "The information could not be retrived."})
    });
})

mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://localhost:27017/bears', { useMongoClient: true })
  .then(function() {
    server.listen(5000, () => {
      console.log("All your databases are belong to us!");
    });
  })
  .catch(function(error) {
    console.log('Database connection failed')
  });

