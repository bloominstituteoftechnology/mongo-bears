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

server.post('/api/bears', function(req, res) {
  const bearInfo = req.body;

  const {
    species,
    latinName
   } = req.body;

  const bear = new Bear(bearInfo);
  
  if (!species || !latinName) {
    console.log(error);
    res.status(400).json({ errorMessage: "Please provide both species and latinName for the Bear." });
  } else {
    bear
      .save()
      .then(savedBear => {
        res.status(201).json(savedBear);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: "There was an error while saving the Bear to the Database" });    
      });
  }
});

server.get('/api/bears', function(req, res) {
  Bear.find({})
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "The information could not be retrieved." });
    });
});

server.get('/api/bears/:id', function(req, res) {
  const id = req.params.id;

  Bear.findById(id)
    .then(bear => {
      if (bear) {
        res.status(200).json(bear);
      } else {
        console.log(error);
        res.status(404).json({ message: "The Bear with the specified ID does not exist." });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "The information could not be retrieved." });
    });
});

server.delete('/api/bears/:id', function (req, res) {
  const id = req.params.id;

  Bear.findByIdAndRemove(id)
    .then(removeBear => {
      if (removeBear) {
        res.status(200).json(removeBear);
      } else {
        console.log(error);
        res.status(404).json({ message: "The Bear with the specified ID does not exist." });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "The Bear could not be removed" });
    });
})

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
