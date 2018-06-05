const router = require('express').Router();

const Bear = require('./bearModel');

router
  .route('/')
  .get((req, res) => {
    Bear.find()
      .then(bears => {
        res.status(200).json(bears);
      })
      .catch(err => res.status(500).json({ error: "The bear information could not be retrieved." }));
  })
  .post((req, res) => {
    const { species, latinName } = req.body;
    const newBear = new Bear({ species, latinName });
    if (!species || !latinName) {
      res.status(400).json({ error: "Please provide both species and latinName for the bear." });
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
    if (id.length !== 24) {
      res.status(400).send({ error: "The ID entered is too short or too long in length." });
      return;
    }
    Bear.findById(id)
      .then(bear => {
        if (bear === null) {
          res.status(404).json({ error: "Bear cannot be found with given ID." });
          return;
        }
        // console.log(bear.id.length);
        res.status(200).json(bear);
      })
      .catch(err => {
        res.status(500).json({ error: "Something went terribly wrong!" });
      });
  })
  .delete((req, res) => {
    const { id } = req.params;
    if (id.length !== 24) {
      res.status(400).send({ error: "The ID entered is too short or too long in length." });
      return;
    }
    Bear.findByIdAndRemove(id)
      .then(bear => {
        if (bear === null) {
          res.status(404).json({ error: "Bear cannot be found with given ID." });
          return;
        }
        res.json(bear);
      })
      .catch(err => {
        res.status(500).json({ error: "Something went terribly wrong!" });
      })
  })
  .put((req, res) => {
    const { id } = req.params;
    const { species, latinName } = req.body;
    const updatedBear = { species, latinName };
    if (id.length !== 24) {
      res.status(400).send({ error: "The ID entered is too short or too long in length." });
      return;
    } else {
      Bear.findByIdAndUpdate(id, updatedBear)
        .then(update => {
          if (update === null) {
            res.status(404).send({ error: "Bear cannot be found with given ID." });
            return;
          }
          res.json(update);
        })
        .catch(err => {
          res.status(500).json({ error: "Something went terribly wrong!" });
        });
    };
  });

module.exports = router;
