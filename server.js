const express = require('express');
const Bear = require('./BearModel.js');
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
      console.log(err);
      res.status(400).json({ error: 'Please provide both species and latinNAme for the Bear.' });
    });
});
bearsRouter.get('/api/bears', function(req, res) {
  Bear.find({})
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => {
      consolelog(err);
      res.status(500).json({ error: 'The information could not be retrieved.' });
    });
});
module.exports = bearsRouter;