const express = require('express');
const Bears = require('./BearModel.js');

//Bears
const bearRoutes = express.Router();
bearRoutes.get('/api/bears', function (req, res) {
  Bear.find({})
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(error => {
      res.status(500)
        .json({ error: `The information couldn't be retrieved` })
    })
})

module.exports = bearRoutes;