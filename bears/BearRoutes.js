const express = require('express');

const BearDocuments = require('./BearModel.js');

const bearRouter = express.Router();

//=========================
//      Bear POST
//=========================

bearRouter.post('/api/bears', (req, res) => {
  const bearInfo = req.body;

  const { species, latinName } = bearInfo;

  if (!species  || !latinName) {
    res.status(400).json({ error: 'Missing Information' });
  }
  
  const bear = new BearDocuments(bearInfo);

  bear
    .save()
    .then(savedBear => {
      res.status(201).json(savedBear);
    })
    .catch(err => {
      res.status(500).json({ msg: 'error saving Bear', error: err });
    });
});

//=========================
//      Bear GET
//=========================

bearRouter.get('/api/bears', (req, res) => {
  BearDocuments.find()
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error getting bears', error: err });
    });
});


//=========================
//      Bear GET by ID
//=========================

bearRouter.get('/api/bears/:id', (req, res) => {
  const { id } = req.params;
  BearDocuments.findById(id)
    .then(bear => {
      res.status(200).json(bear);
    })
    .catch(err => {
      res.status(500).json({ msg: 'Cant find him bro', error: err });
    });
});

module.exports = bearRouter;