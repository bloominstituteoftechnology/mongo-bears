const router = require('express').Router();
const Bear = require('../database.js');

router
  .route('/')
  .get((req, res) => {

    Bear.find()
      .then(response => {
        res.status(200).json({ data: response })
      })
      .catch(err => res.status(500).json({ data: err }))
  })
  .post((req, res) => {
    const { species, latinName } = req.body
    if (species && latinName) {
      Bear.create(req.body)
        .then(response => res.status(201).json({ data: response }))
        .catch(err => res.status(500).json({ errorMessage: "There was an error while saving the bear to the database" }))
    }
    else {
      res.status(400).json({ errorMessage: "Please provide both species and latinName for the bear." })
    }
  });

router
  .route('/:id')
  .get((req, res) => {

    Bear.findById(req.params.id)
      .then(response => {
        if (response.length > 0) {
          res.status(200).json({ data: response })
        }
        else {
          res.status(404).json({ message: "The bear with the specified ID does not exist." })
        }
      })
      .catch(err => res.status(500).json({ errorMessage: "There was an error while saving the bear to the database" }))
  })
  .delete((req, res) => {

    Bear.findByIdAndDelete(req.params.id)
      .then(response => {
        if (response) {
          res.status(200).json({ data: response })
        }
        else {
          res.status(404).json({ message: "The bear with the specified ID does not exist." })
        }
      })
      .catch(err => res.status(500).json({ errorMessage: "There was an error while saving the bear to the database" }))
  })
  .put((req, res) => {

    Bear.findByIdAndUpdate(req.params.id, req.body)
      .then(response => {
        if (response) {
          res.status(200).json({ data: response })
        }
        else {
          res.status(404).json({ message: "The bear with the specified ID does not exist." })
        }
      })
      .catch(err => res.status(500).json({ errorMessage: "There was an error while saving the bear to the database" }))
  });

module.exports = router;
