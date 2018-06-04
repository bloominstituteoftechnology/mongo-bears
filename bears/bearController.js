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
        res.status(500).json({ errorMessage: "The bear information could not be retrieved." })
      })
  })
  .post((req, res) => {
    const { species, latinName } = req.body;
    const newBear = Bear({ species, latinName });
    if (!species || !latinName) {
      res.status(400).json({ errorMessage: "Please provide both species and latinName for the bear." });
      return;
    }
    newBear.save()
      .then( bear => {
        res.status(201).json(bear);
      })
      .catch( err => {
        res.status(500).json({ errorMessage: "There was an error while saving the bear to the database" })
      })
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Bear.findById(id)
      .then( bear => {
        if (bear === null) {
          res.status(404).json({ message: "The bear with the specified ID does not exist." })
        } else {
          res.status(200).json(bear);
        }
      })
      .catch( err => {
        res.status(500).json({ errorMessage: "The bear information could not be retrieved." })
      })
  })
  .delete((req, res) => {
    const { id } = req.params;
    Bear.findByIdAndRemove(id)
    .then( bear => {
      if (bear === null) {
        res.status(404).json({ errorMessage: "The bear with the specified ID does not exist." })
      } else {
        res.status(200).json(bear);
      }
    })
    .catch( err => {
      res.status(500).json({ errorMessage: "The bear could not be removed" })
    })
  })
  .put((req, res) => {
    const { id } = req.params;
    const changes = req.body;
    Bear.findByIdAndUpdate(id, changes)
      .then( bear => {
        if (bear === null) {
          res.status(404).json({ message: "The bear with the specified ID does not exist." })
        } else {
          Bear.findById(id)
            .then( updatedBear => {
              if (updatedBear === null) {
                res.status(404).json({ message: "The bear with the specified ID does not exist." })
              } else {
                res.status(200).json(updatedBear);
              }
            })
            .catch( err => {
              res.status(500).json({ errorMessage: "The bear information could not be retrieved." })
            })
        }
      })
      .catch( err => {
        res.status(500).json({ errorMessage: "The bear information could not be modified." })
      })
  });

module.exports = router;
