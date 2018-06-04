const router = require('express').Router();

const Bear = require('./bearModel');

router
  .route('/')
  .get((req, res) => {
    Bear.find()
      .then(bears => {
        res.status(200).json(bears);
        return;
      })
      .catch(err => res.status(500).json({ error: "Something went terribly wrong!" }));
  })
  .post((req, res) => {
    const { species, latinName } = req.body;
    const newBear = new Bear({ species, latinName });
    if (!species || !latinName) {
      res.status(400).json({ error: "Please provide both species and latinName for the bear." });
      return;
    };
    newBear
      .save()
      .then(savedBear => {
        res.status(201).json(savedBear);
      })
      .catch(err => {
        res.status(500).json({ error: "There was an error while saving the bear to the database" });
      });
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Bear.findById(id)
      .then(bear => {
        res.status(200).json(bear);
        return;
      })
      .catch(err => {
        res.status(404).json({ error: "Bear cannot be found with given ID." });
      });
  })
  .delete((req, res) => {
    const { id } = req.params;
    Bear.findByIdAndRemove(id)
      .then(bear => {
        res.json(bear);
        return;
      })
      .catch(err => {
        res.status(404).json({ error: "Bear was not found with given ID." });
      })
  })
  .put((req, res) => {
    const { id } = req.params;
    const { species, latinName } = req.body;
    const updatedBear = { species, latinName };

    Bear.findByIdAndUpdate(id, updatedBear)
      .then(update => {
        res.json(updatedBear);
        return;
      })
      .catch(err => {
        res.status(404).json({ error: "Bear was not found with given ID." });
      })
  });

module.exports = router;
