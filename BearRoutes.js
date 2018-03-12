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
        message: 'Error getting the bears',
      });
    });
});

bearsRouter.post('/', (req, res) => {
  const bearInfo = req.body;
  const bear = new Bear(bearInfo);

  bear
    .save()
    .then(savedBear => {
      res.status(201).json(savedBear);
    })
    .catch(err => {
      res.status(500).json({message: 'error creating bear'});
    });
});

bearsRouter.get('/:id', (req, res) => {
  const {id} = req.params;
  Bear.findById(id, (err, bear) => {
    if (!bear)
      res.status(404).json({
        msg: 'The bear with the specified ID does not exist',
        error: err,
      });
    if (err) res.status(500).json({message: 'error getting bear'});
    res.status(201).json(bear);
  });
});

bearsRouter.put('/:id', (req, res) => {
  const {id} = req.params;
  const bear = req.body;
  Bear.findByIdAndUpdate(id, bear, {new: true}, (err, updatedBear) => {
    if (!updatedBear)
      res.status(404).json({
        message: 'The bear with the specified ID does not exist',
        error: err,
      });
    if (err)
      res.status(500).json({error: 'THe bear information cannot be modified'});
    res.status(201).json(updatedBear);
  });
});

bearsRouter.delete('/:id', (req, res) => {
  const {id} = req.params;
  Bear.findByIdAndRemove(id, (err, deletedBear) => {
    if (!deletedBear)
      res.status(404).json({
        message: 'The bear with the specified ID does not exist',
        error: err,
      });
    if (err) res.status(500).json({message: 'Bear cannot be removed'});
    res.status(201).json(deletedBear);
  });
});

module.exports = bearsRouter;
