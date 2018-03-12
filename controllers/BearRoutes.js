const express = require('express');
const bearRouter = express.Router();
const Bear = require('../models/schema.js');

const STATUS_BAD_REQUEST = 400;
const STATUS_NOT_FOUND = 404;
const STATUS_SEVER_ERROR = 500;
const STATUS_CREATED_SUCCESS = 201;
const STATUS_OK = 200;

bearRouter.post('/bears', (req, res) => {
  if (req.body.species && req.body.latinName) {
    const bear = new Bear(req.body);
    bear
      .save()
      .then((savedBear) => {
        res.status(STATUS_CREATED_SUCCESS).json(savedBear);
      })
      .catch((err) => {
        res.status(STATUS_SEVER_ERROR).send({
          error: 'There was an error while saving the Bear to the Database',
        });
      });
  } else {
    res.status(STATUS_BAD_REQUEST).json({
      errorMessage: 'Please provide both species and latinName for the Bear.',
    });
  }
});
bearRouter.get('/bears', (req, res) => {
  Bear.find({})
    .then((bears) => {
      res.status(STATUS_OK).json(bears);
    })
    .catch((err) => {
      res
        .status(STATUS_SEVER_ERROR)
        .json({ error: 'The information could not be retrieved.' });
    });
});
bearRouter.get('/bears/:id', (req, res) => {
  // if (mongoose.Types.ObjectId.isValid(req.params.id)) {
  Bear.findById(req.params.id)
    .then((id) => {
      console.log(id);
      if (id === null) {
        res.status(STATUS_NOT_FOUND).json({
          message: 'The Bear with the specified ID does not exist.',
        });
      } else {
        res.status(STATUS_OK).json(id);
      }
    })
    .catch((err) => {
      switch (err.name) {
        case 'CastError':
          return res
            .status(STATUS_SEVER_ERROR)
            .json({ error: 'The information could not be retrieved.' });
        default:
          res.status(STATUS_SEVER_ERROR).json({ error: err.name });
      }
    });
  // }
});

bearRouter.delete('/bears/:id', (req, res) => {
  Bear.findByIdAndRemove(req.params.id)
    .then((id) => {
      res
        .status(STATUS_OK)
        .json({ success: `Terrible bear, ${req.params.id},  deleted` });
    })
    .catch((err) => {
      res
        .status(STATUS_NOT_FOUND)
        .json({ message: 'The Bear with the specified ID does not exist.' });
    });
});
bearRouter.put('/bears/:id', (req, res) => {
  Bear.findByIdAndUpdate(req.params.id, req.body)
    .then((bear) => {
      if (bear === null) {
        res
          .status(STATUS_NOT_FOUND)
          .json({ message: 'The Bear with the specified ID does not exist.' });
      } else {
        res
          .status(STATUS_OK)
          .json({ success: `Bear, ${req.params.id} Updated` });
      }
    })
    .catch((err) => {
      console.log(err)
      switch (err.name) {
        default:
          res
            .status(STATUS_SEVER_ERROR)
            .json({ error: 'The Bear information could not be modified.' });
      }
    });
});

module.exports = bearRouter;
