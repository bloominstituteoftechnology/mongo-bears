const express = require('express');

const Bear = require('./BearModel.js');

const bearsRouter = express.Router();

bearsRouter.post('/api/bears', function(req, res) {
  const bearInfo = req.body;

  const {
    species,
    latinName
   } = req.body;

  const bear = new Bear(bearInfo);
  
  if (!species || !latinName) {
    console.log(error);
    res.status(400).json({ errorMessage: "Please provide both species and latinName for the Bear." });
  } else {
    bear
      .save()
      .then(savedBear => {
        res.status(201).json(savedBear);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: "There was an error while saving the Bear to the Database" });    
      });
  }
});

bearsRouter.get('/api/bears', function(req, res) {
  Bear.find({})
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "The information could not be retrieved." });
    });
});

bearsRouter.get('/api/bears/:id', function(req, res) {
  const id = req.params.id;

  Bear.findById(id)
    .then(bear => {
      if (bear) {
        res.status(200).json(bear);
      } else {
        console.log(error);
        res.status(404).json({ message: "The Bear with the specified ID does not exist." });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "The information could not be retrieved." });
    });
});

bearsRouter.delete('/api/bears/:id', function (req, res) {
  const id = req.params.id;

  Bear.findByIdAndRemove(id)
    .then(removeBear => {
      if (removeBear) {
        res.status(200).json(removeBear);
      } else {
        console.log(error);
        res.status(404).json({ message: "The Bear with the specified ID does not exist." });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "The Bear could not be removed" });
    });
});

bearsRouter.put('/api/bears/:id', function (req, res) {
  const id = req.params.id;

  const {
    species,
    latinName
  } = req.body;

  Bear.findByIdAndUpdate(id, req.body, { new: true })
    .then(updateBear => {
      if (updateBear) {
        res.status(200).json(updateBear);
      } else {
        console.log(error);
        res.status(404).json({ message: "The Bear with the specified ID does not exist." });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "The Bear information could not be modified." });
    });
});

module.exports = bearsRouter;