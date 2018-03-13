const express = require('express');
const mongoose = require('mongoose');
const Bear = require('./bearmodels.js');

const bearsRouter = express.Router();

function validBearCheck(bear, res) {
  if(!bear.species || !bear.latinName) {
    res.status(400).json({ errorMessage: "Please provide both species and latinName for the Bear." })
  } else {
    res.status(201).json(savedBear);
  }
}

bearsRouter.post('/api/bears', function(req, res) {
  const bearInfo = req.body;
  const bear = new Bear(bearInfo);

  bear.save()
    .then(inputBear => {
      res.status(201).json(inputBear);
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error while saving the Bear to the Database", error: err })
    });
});

bearsRouter.get('/api/bears', function(req, res) {
  Bear.find({})
    .then(bear => {
      res.status(200).json(bear)
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error getting bears', error: err })
    });
});

bearsRouter.get('/api/bears/:id', function(req, res) {
  const bearId = { _id: req.params.id };
  Bear.findById(bearId)
    .then(bear => {
      res.status(200).json(bear)
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error getting bears', error: err })
    });
});

bearsRouter.put('/api/bears/:id', function(req, res) {
  const bearId = { _id: req.params.id };
  const updateBear = req.body;
  Bear.findByIdAndUpdate(bearId, updateBear, { upsert: true, new: true } )
    .then(abc => {
      res.status(200).json(abc)
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error getting bears', error: err })
    });
});

bearsRouter.delete('/api/bears/:id', function(req, res) {
  const bearId = { _id: req.params.id };
  Bear.findByIdAndRemove(bearId)
    .then(doc => {
      res.status(200).json(doc)
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error getting bears', error: err })
    });
});



module.exports = bearsRouter;

