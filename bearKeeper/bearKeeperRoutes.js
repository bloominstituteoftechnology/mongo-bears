const express = require('express');
const bearKeeper = require('./bearKeeperModel');

const bearKeeperRouter = express.Router();

bearKeeperRouter.get('/', function(req, res) {
  bearKeeper
    .find({})
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => {
      res.status(500).json({error: 'The information could not be retrieved'});
    });
});

module.exports = bearKeeperRouter;
