const express = require('express');
const bearRouter = express.Router();
const Bear = require('./BearModel.js');

bearRouter.get('/', function(req, res) {
  res.status(200).json({ status: 'your shit is not fucked up' });
});

module.exports = bearRouter;