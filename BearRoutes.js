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

bearsRouter.post('/', (req, res) => {
  const bearInfo = req.body;
  const bear = new Bear(bearInfo);

  bear.save()
    .then(savedBear => {
      res.status(201).json(savedBear);
    })
    .catch(err => {
      res.status(500).json({ msg: 'error creating bear', error: err });
    });
})

bearsRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  Bear.findById(id, (err, bear) => {
    if (err) res.status(500).json({msg: 'error getting bear', error: err });
    res.status(201).json(bear);
  })
})

module.exports = bearsRouter;
