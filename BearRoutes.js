const express = require('express');
const Bear = require('./Bear.js');

const bearsRouter = express.Router();

bearsRouter.get('/', (req, res) => {
  Bear.find({})
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => {
      res.status(500).json({
        msg: 'Error getting the bears',
        error: err,
      });
    });
});

module.exports = bearsRouter;
