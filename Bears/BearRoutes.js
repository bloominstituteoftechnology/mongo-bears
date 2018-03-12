const express = require('express');
const bearRouter = express.Router();
const Bear = require('./BearModel.js');

bearRouter.get('/', function(req, res) {
  Bear.find({})
    .then(bears => {
      res.status(200).json({ bears });      
    })
    .catch(err => {
      res.status(500).json({ error: 'The information could not be retrieved' });
    });
});

bearRouter.post('/', function(req, res) {
  const bearInfo = req.body;
  const { species, latinName } = bearInfo;
  if (!species  || !latinName) {
    res.status(400).json({ errorMessage: 'Please provide both species and latinName for the Bear.' });
  }
  const bear = new Bear(bearInfo);
  bear.save()
    .then(savedBear => {
      res.status(201).json(savedBear);
    })
    .catch(err => {
      res.status(500).json({ error: 'There was an error while saving the Bear to the Database' });
    });
});

module.exports = bearRouter;
