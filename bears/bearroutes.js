const express = require('express');
const mongoose = require('mongoose');
const Bear = require('./bearmodels.js');

const bearsRouter = express.Router();

bearsRouter.post('/api/bears', function(req, res) {
  const bearInfo = req.body;

  const bear = new Bear(bearInfo);

  bear
    .save()
    .then(savedBear => {
      res.status(201).json(savedBear);
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error creating bear.', error: err });
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
  const bearId = req.query.params;
  // console.log("Nope..params isn't it", bearId);
  Bear.findOne(bearId)
    .then(bear => {
      res.status(200).json(bear)
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error getting bears', error: err })
    });
});

module.exports = bearsRouter;

