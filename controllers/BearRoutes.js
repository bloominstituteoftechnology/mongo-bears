const express = require('express');
const bearRouter = express.Router();
const Bear = require('../models/schema.js');

const STATUS_BAD_REQUEST = 400;
const STATUS_NOT_FOUND = 404;
const STATUS_SEVER_ERROR = 500;
const STATUS_CREATED_SUCCESS = 201;
const STATUS_OK = 200;


bearRouter.post('/bears', (req, res) => {
  if( req.body.species &&  req.body.latinName) {
    const bear = new Bear(req.body);

    bear
    .save()
    .then(savedBear => {
      res.status(STATUS_CREATED_SUCCESS).json(savedBear);
    })
    .catch(err => {
      res.status(STATUS_SEVER_ERROR).send({ error: "There was an error while saving the Bear to the Database" })
    });
  } else {
    res.status(STATUS_BAD_REQUEST).json({ errorMessage: "Please provide both species and latinName for the Bear." });
  }
})
bearRouter.get('/bears', (req, res) => {
  
})
bearRouter.get('/bears/:id', (req, res) => {
  
})
bearRouter.delete('/bears/:id', (req, res) => {
  
})
bearRouter.put('/bears/:id', (req, res) => {
  
})

module.exports = bearRouter;