const express = require('express');

const Bear = require('./BearModel.js');

const bearsRouter = express.Router();

const STATUS_SUCCESS = 200;
const STATUS_CREATED = 201;
const STATUS_BAD_REQUEST = 400;
const STATUS_NOT_FOUND = 404;
const STATUS_USER_ERROR = 500;

bearsRouter.post('/', (req, res) => {
  const bearInfo = req.body;

  const bear = new Bear(bearInfo);

  bear
    .save()
    .then(savedBear => {
      res.status(STATUS_CREATED);
      res.send(savedBear);
    })
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_BAD_REQUEST);
        res.send({
          errorMessage:
            'Please provide both species and latinName for the Bear.',
        });
      } else {
        res.status(STATUS_USER_ERROR);
        res.send({
          error: 'There was an error while saving the Bear to the Database.',
        });
      }
    });
});

bearsRouter.get('/', (req, res) => {
  Bear.find({})
    .then(bears => {
      res.status(STATUS_SUCCESS);
      res.send(bears);
    })
    .catch(err => {
      res.status(STATUS_USER_ERROR);
      res.send({ error: 'The information could not be retrieved.' });
    });
});

bearsRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  Bear.findById(id)
    .then(bear => {
      res.status(STATUS_SUCCESS);
      res.send(bear);
    })
    .catch(err => {
      console.log(err);
      if (err.name === 'CastError') {
        res.status(STATUS_NOT_FOUND);
        res.send({ message: 'The Bear with the specified ID does not exist.' });
      } else {
        res.status(STATUS_USER_ERROR);
        res.send({ error: 'The information could not be retrieved.' });
      }
    });
});

bearsRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  Bear.findByIdAndRemove(id)
    .then(bear => {
      res.status(STATUS_SUCCESS);
      res.send(bear);
    })
    .catch(err => {
      if (err.name === 'CastError') {
        res.status(STATUS_NOT_FOUND);
        res.send({ message: 'The Bear with the specified ID does not exist.' });
      } else {
        res.status(STATUS_USER_ERROR);
        res.send({ error: 'The Bear could not be removed.' });
      }
    });
});

bearsRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  Bear.findByIdAndUpdate({ _id: id }, req.body, { new: true })
    .then(bear => {
      res.status(STATUS_SUCCESS);
      res.send({ bearUpdated: bear });
    })
    .catch(err => {
      if (err.name === 'CastError') {
        res.status(STATUS_NOT_FOUND);
        res.send({ message: 'The Bear with the specified ID does not exist.' });
      } else {
        res.status(STATUS_USER_ERROR);
        res.send({ error: 'The Bear information could not be modified.' });
      }
    });
});

module.exports = bearsRouter;
