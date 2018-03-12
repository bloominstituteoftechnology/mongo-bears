const express = require('express');

const bearKeeperRouter = express.Router();

bearKeeperRouter.get('/', function(req, res) {
  bearKeeper
    .find({})
    .then(bears => {
      console.log('Successfully connected to mongoDB');
    })
})
