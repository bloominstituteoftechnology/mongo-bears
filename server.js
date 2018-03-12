const express = require('express');
const helmet = require('helmet');
const cors = require('cors'); // https://www.npmjs.com/package/cors
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Bear = require('./bears/BearModel.js');
const server = express();

server.use(helmet()); // https://helmetjs.github.io/
server.use(cors());   // https://medium.com/trisfera/using-cors-in-express-cac7e29b005b
server.use(bodyParser.json());

server.get('/', function(req, res) {
  res.status(200).json({ status: 'API Running' });
});

server.post('/api/bears', (req, res) => {
  const info = req.body;
  const { species, latinName } = info;

  const bear = new Bear(info);
  if (species && latinName) {
    bear
      .save()
      .then(saveBear => {
        res
          .status(201)
          .json(saveBear);
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: 'Couldnt save to db'});
      });
  } else {
    res
      .status(500)
      .json({
        errorMessage: 'Enter species and Latin name',
      });
  }
});
// return all bears
server.get('/api/bears', (req, res) => {
  Bear.find()
    .then(bears => {
      res
        .status(200)
        .json(bears);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'Couldnt get em'});
    });
});
// get bear by id
server.get('/api/bears/:id', (req, res) => {
  const id = req.params.id;
  Bear.findById(id)
    .then(bear => {
      if (bear) {
        res
          .status(200)
          .json(bear);
      } else {
        res.status(404).json({ message: 'Bear with ID not found' });
      }
    })
    .catch(error => {
      if (error.name === 'CastError') {
        res
          .status(400)
          .json({ message: `Invalid ID: ${error.value}` });
      } else {
        res
          .status(500)
          .json({ error: 'Couldnt get the bear info'});
      }
    });
});
// find by id and remove
server.delete('/api/bears/:id', (req, res) => {
  const id = req.params.id;
  Bear.findByIdAndRemove(id)
    .then(bear => {
      if (bear) {
        res.status(200).json(bear);
      } else {
        res.status(404).json({ message: 'couldnt find bear' });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'could not get bear'});
    });
});
// replace data with supplied id
server.put('/api/bears/:id', (req, res) => {
  const id = req.params.id;
  const { species, latinName } = req.body;

  if (species && latinName) {
    Bear.findByIdAndUpdate(id, req.body)
      .then(updatedBear => {
        if (updatedBear) {
          res.status(201).json(updatedBear);
        } else {
          res
            .status(404)
            .json({ error: `bear with id: ${id} doesnt exist` });
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({
            error: 'error updating bear'
          });
      });
  } else {
    res
      .status(500)
      .json({
        errorMessage: 'did not provide both species and latin name'
      });
  }
});

mongoose
  .connect('mongodb://localhost/BearKeeper')
  .then(db => {
    console.log(`Connected to ${db.connections[0].name}`);
  })
  .catch(error => {
    console.log('Failed to connect to database');
  });

const port = process.env.PORT || 5005;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
});
