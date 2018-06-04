const router = require('express').Router();
const Bear = require('./bearModel');

router
  .route('/')
  .get((req, res) => {
    Bear.find()
      .then( bears => {
        res.status(200).json(bears);
      })
      .catch( err => {
        res.status(404).json({ error: err })
      })
  })
  .post((req, res) => {
    const { species, latinName } = req.body;
    const newBear = Bear({ species, latinName });
    newBear.save()
      .then( bear => {
        res.status(201).json(bear);
      })
      .catch( err => {
        res.status(400).json({ error: "Could not add bear. Make sure to include a species and a latin name" })
      })
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Bear.findById(id)
      .then( bear => {
        if (bear === null) {
          res.status(404).json({ error: "That bear no longer exists in the database"})
        } else {
          res.status(200).json(bear);
        }
      })
      .catch( err => {
        res.status(404).json({ error: `There is no bear with id ${id} in the database` })
      })
  })
  .delete((req, res) => {
    const { id } = req.params;
    Bear.findByIdAndRemove(id)
    .then( bear => {
      if (bear === null) {
        res.status(404).json({ error: "That bear no longer exists in the database"})
      } else {
        res.status(200).json(bear);
      }
    })
    .catch( err => {
      res.status(404).json({ error: `There is no bear with id ${id} in the database` })
    })
  })
  .put((req, res) => {
    res.status(200).json({ status: 'please implement PUT functionality' });
  });

module.exports = router;
