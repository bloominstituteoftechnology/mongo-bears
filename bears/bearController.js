const router = require('express').Router();

const Bear = require('./bearModel.js');

router
  .route('/')
  .get((req, res) => {
    Bear.find()
      .then(bears => {
        res.status(200).json(bears);
      })
      .catch(err => {
        return res.status(500).json({ error: `Error fetching bears`});
      })
  })
  .post((req, res) => {
    const { species, latinName } = req.body;
    const newBear = new Bear({ species, latinName });
    newBear
      .save()
      .then(response => {
        res.status(201).json(response);
      })
      .catch(err => {
        return res.status(422).json({ error: err });
      });
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Bear.findById(id)
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        return res.status(404).json({ error: err });
      })
  })
  .delete((req, res) => {
    const{ id } = req.params;
    Bear
      .findByIdAndDelete(id)
      .then(response => {
        res.json({ message: `The bear was deleted.`});
      })
      .catch(err => {
        return res.status(500).json({ error: err });
      })
  })
  .put((req, res) => {
    const { id } = req.params;
    const { species, latinName } = req.body;
    Bear
      .findByIdAndUpdate(id, { species, latinName})
      .then(response => {
        res.json({ message: `The Bear was deleted`});
      })
      .catch(err => {
        return res.status(500).json({ error: err });
      });
  });

module.exports = router;