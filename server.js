const express = require('express');
const helmet = require('helmet');
const cors = require('cors'); // https://www.npmjs.com/package/cors
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Bear = require('./Bears/BearModel');

const server = express();

server.use(helmet()); // https://helmetjs.github.io/
server.use(cors());   // https://medium.com/trisfera/using-cors-in-express-cac7e29b005b
server.use(bodyParser.json());

server.get('/', function(req, res) {
  res
    .status(200)
    .json({ status: 'API Running' });
});

server.post('/api/bears', (req, res) => {
  const bearInformation = req.body;
  const { species, latinName } = bearInformation;

  const bear = new Bear(bearInformation); // this is mongoose document
  if (species && latinName) {
    bear
      .save() // returns a promise
      .then(savedBear => {
        res
          .status(201)
          .json(savedBear);
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: 'There was an error while saving the bear to the database'});
      });
  } else {
    res
      .status(500)
      .json({
        errorMessage: 'Please provide both species and latinName for the bear.',
      });
  }
});

server.get('/api/bears', (req, res) => {
  Bear.find()  // not specifying anything so return all the bears
    .then(bears => {
      res
        .status(200)
        .json(bears);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'The information could not be retrieved.'});
    });
});

server.get('/api/bears/:id', (req, res) => {
  const id = req.params.id;

  Bear.findById(id)  // not specifying anything so return all the bears
    .then(bear => {
      if (bear) {
        res
          .status(200)
          .json(bear);
      } else {
        res.status(404).json({ message: 'Bear with that ID not found.' });
      }
    })
    .catch(error => {
      if (error.name === 'CastError') {
        res
          .status(400)
          .json({ message: `The ID: ${error.value} is not valid.` });
      } else {
        res
          .status(500)
          .json({ error: 'The bear information could not be retrieved.'});
      }
    });
});

server.delete('/api/bears/:id', (req, res) => {
  const id = req.params.id;

  Bear.findByIdAndRemove(id)
    .then(bear => {
      if (bear) {
        res.status(200).json(bear);
      } else {
        res.status(404).json({ message: 'Bear not found.' });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'The bear information could not be retrieved.'});
    });
});

server.put('/api/bears/:id', (req, res) => {
  const { id } = req.params;
  const { species, latinName } = req.body;

  if (species && latinName) {
    Bear.findByIdAndUpdate(id, req.body)
      .then(updatedBear => {
        if (updatedBear) {
          res.status(201).json(updatedBear);
        } else {
          res
            .status(404)
            .json({ error: `The bear with ID: ${id} does not exist` });
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({
            error: 'There was an error while updating the bear in the database.'
          });
      });
  } else {
    res
      .status(500)
      .json({
        errorMessage: 'Please provide both species and latinName for the bear.'
      });
  }
});

mongoose
  .connect('mongodb://localhost/BearKeeper') // returns a promise
  .then(db => {
    console.log(`Successfully connected to the ${db.connections[0].name} database`);
  })
  .catch(error => {
    console.log('Database connection failed');
  });

const port = process.env.PORT || 5005;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
});


// client (JS Objects) <--> [API (JS Objects) mongoose] <-BSON-> MongoDB (BSON)
// mongoose Schema =compiled to=> mongoose Model =bridge to documents in the database