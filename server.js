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
  res.status(200).json({ status: 'API Running' });
});

server.post('/api/bears', function(req, res) {
  const bearInformation = req.body;
  const { species, latinName } = req.body;

  if (species && latinName) {
    const bear = new Bear(bearInformation);
    bear
    .save() 
    .then(savedBear => {
      res.status(201).json(savedBear);
    })
    .catch(error => {
      res
        .status(500)
        .json({
          error: 'There was an error while saving the Bear to the Database',
        });
    });
  } else {
    res.status(500).json({
      errorMessage: 'Please provide both species and latinName for the Bear.',
    });
  }
});

server.get('/api/bears', function(req, res) {
  Bear.find({})
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'The information could not be retrived.' });
    });
});

server.get('/api/bears/:id', function(req, res) {
  const id = req.params.id;
  
  Bear.findById(id)
    .then(bear => {
      res.status(200).json(bear);
    }) 
    .catch(error => {
      res
        .status(500)
        .json({ error: 'The bear information could not be retrived.' })
    })
});

server.delete('/api/bears/:id', function(req, res) {
  const id = req.params.id;
  
  Bear.findByIdAndRemove(id)
    .then(bear => {
      console.log('deleted bear', bear)
      res.status(200).json(bear);
    }) 
    .catch(error => {
      res
        .status(500)
        .json({ error: 'The bear information could not be retrived.' })
    })
});

server.put('/api/bears/:id', function(req, res) {
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
          .json({ error: `The Bear with ID: ${id} does not exist.` });
        }
      })
      .catch(error => {
        res.status(500).json({ 
          error: 'There was an error while updating the Bear to the Database.', 
        });
      });
  } else {
    res.status(500).json({
      errorMessage: 'Please provide both species and latinName for the Bear.',
    });
  }
});

mongoose
  .connect('mongodb://localhost/BearKeeper')
  .then(db => {
    console.log(`Successfully Connected to the ${db.connections[0].name} database`);
  })
  .catch(error => {
    console.error('Database Connection Failed');
  });

const port = process.env.PORT || 5005;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
});

0