const express = require('express');

const BearModel = require('./bearModel.js');

const bearRouter = express.Router();

// '/api/bears'
bearRouter.post('/', (req, res) => {
  const info = req.body;
  if (!info.species || !info.latinName)
    res.status(400).send({
      errorMessage: 'Please provide both species and latinName for the Bear.',
    });

  const bear = new BearModel(info);

  bear
    .save()
    .then(bear => {
      res.status(201).send(bear);
    })
    .catch(err => {
      res.status(500).send({
        error: 'There was an error while saving the Bear to the Database',
      });
    });
});

bearRouter.get('/', (req, res) => {
  BearModel.find({})
    .then(bears => res.status(200).send(bears))
    .catch(err =>
      res.status(500).send({ error: 'The information could not be retrieved.' })
    );
});

bearRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  BearModel.findById(id)
    .then(bear => {
      if (!bear)
        res
          .status(404)
          .send({ message: 'The Bear with the specified ID does not exist.' });
      res.status(200).send(bear);
    })
    .catch(err =>
      res.status(500).send({ error: 'The information could not be retrieved.' })
    );
});

bearRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  BearModel.findByIdAndRemove(id)
    .then(bear => {
      if (!bear)
        res
          .status(404)
          .send({ message: 'The Bear with the specified ID does not exist.' });
      res.status(200).send(bear);
    })
    .catch(err =>
      res.status(500).send({ error: 'The Bear could not be removed' })
    );
});

bearRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const info = req.body;
  BearModel.findByIdAndUpdate(id, info)
    .then(bear => {
      if (!bear)
        res
          .status(404)
          .send({ message: 'The Bear with the specified ID does not exist.' });
      res.status(200).send(info);
    })
    .catch(err =>
      res
        .status(500)
        .send({ error: 'The Bear information could not be modified.' })
    );
});

module.exports = bearRouter;
