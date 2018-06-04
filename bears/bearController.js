const router = require('express').Router();

const Bear = require('./bearModel');

router
  .route('/')
  .get((req, res) => {
    Bear.find()
    .then(bears => {    
      res.status(200).json({bears});
    })
    .catch(err => {
      res.status(500).json({errorMessage: "The bear information could not be retrieved."})
    })
  })
  .post((req, res) => {
    const { species, latinName} = req.body;
    const newBear = new Bear({species, latinName});
    newBear.save()
    .then(response => {
      console.log(response);
      if (!species || !latinName) {
        res.status(400).json({errorMessage: "Please provide both species and latinName for the bear." })
        return;
      }
      else {
        res.status(201).json(response);
      }
    })
    .catch(err => {
      res.status(500).json({error: err})
    }) 
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Bear.findById(id)
    .then( response => {   
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({error: "The bear with the specified ID does not exist."})
    })
  })
  .delete((req, res) => {
    const { id } = req.params;
    Bear.findByIdAndRemove(id)
    .then(bear => {
      res.status(200).json(bear)
    })
    .catch(err => {
      res.status(500).json({error: "The bear with the specified ID does not exist."})
    })
  })
  .put((req, res) => {
    const { id } = req.params;
    const { species, latinName } = req.body;
    Bear.findByIdAndUpdate(id, {species, latinName})
    .then(bear => {
      res.status(200).json(bear);
    })
    .catch(err => {
      res.status(500).json({error: "The bear with the specified ID does not exist."})
    })
  });

module.exports = router;
