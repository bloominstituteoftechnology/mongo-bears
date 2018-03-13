const express = require('express');
const mongoose = require('mongoose');
const Bear = require('./bearmodels.js');

const bearsRouter = express.Router();

bearsRouter.post('/api/bears', function(req, res) {
  const bearInfo = req.body;
  const bear = new Bear(bearInfo);

  bear.save()
    .then(inputBear => {
      res.status(201).json(inputBear);
    })
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(400).json({ errorMessage: "Please provide both species and latinName for the Bear." }).end();
      } else {
        res.status(500).json({ error: "There was an error while saving the Bear to the Database" }).end();
      }
    });
});

bearsRouter.get('/api/bears', function(req, res) {
  Bear.find({})
    .then(bear => {
      res.status(200).json(bear);
    })
    .catch(err => {
      res.status(500).json({ error: "The information could not be retrieved." }).end();
    });
});

bearsRouter.get('/api/bears/:id', function(req, res) {
  const bearId = { _id: req.params.id };
  Bear.findById(bearId)
    .then(bear => {
      res.status(200).json(bear)
    })
    .catch(err => {
      if (err.name === 'CastError') {
        res.status(404).json({ message: "The Bear with the specified ID does not exist." });
      } else {
        res.status(500).json({ error: "The information could not be retrieved." }).end();
      }
    });
});

bearsRouter.put('/api/bears/:id', function(req, res) {
  const bearId = { _id: req.params.id };
  const updateBear = req.body;
  Bear.findByIdAndUpdate(bearId, updateBear, { new: true } )
    .then(doc => {
      res.status(200).json(doc)
    })
    .catch(err => {
      if (err.name === 'CastError') {
        res.status(404).json({ message: "The Bear with the specified ID does not exist." });
      } else {
        res.status(500).json({ error: "The Bear information could not be modified." }).end();
      }
    });
});

bearsRouter.delete('/api/bears/:id', function(req, res) {
  const bearId = { _id: req.params.id };
  Bear.findByIdAndRemove(bearId)
    .then(doc => {
      res.status(200).json(doc)
    })
    .catch(err => {
      if (err.name === 'CastError') {
        res.status(404).json({ message: "The Bear with the specified ID does not exist." });
      } else {
        res.status(500).json({ error: "The Bear could not be removed" }).end();
      }
    });
});

module.exports = bearsRouter;
