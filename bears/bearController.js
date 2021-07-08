const router = require('express').Router();

const Bear = require('./bearModel');

router
  .route('/')
  .get(get)
  .post(post);

router
  .route('/:id')
  .get((req, res) => {
    Bear.find({ _id: req.params.id })
    .then(bear => {
      res.status(404).json({ bear });
    })
    .catch(err => {
      console.log(err);
      if(err.name === 'CastError'){
        res.status(404).json({ message: "The bear with the specified ID does not exist." })
      } else {
        res.status(500).json({ errorMessage: "The bear information could not be retrieved." });
      }
    });
  })
  .delete((req, res) => {
    Bear.remove({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ status: 'Deleted bear with ID: ' + req.params.id });
    })
    .catch(err => {
      console.log(err);
      if(err.name === 'CastError'){
        res.status(404).json({ message: "The bear with the specified ID does not exist." })
      } else {
        res.status(500).json({ errorMessage: "The bear could not be removed" });
      }
    });
  })
  .put((req, res) => {
    Bear.where({ _id: req.params.id }).update({ $set: req.body })
    .then(() => {
      res.status(200).json({ status: 'Bear updated' });
    })
    .catch(err => {
      console.log(err);
      if(err.name === 'CastError'){
        res.status(404).json({ message: "The bear with the specified ID does not exist." })
      } else {
        res.status(500).json({ errorMessage: "The bear information could not be modified." });
      };
    });
  });

  function get(req, res) {
    Bear.find()
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "The bear information could not be retrieved." });
    })
  }

  function post(req, res) {
    const bearData = req.body;

    const bear = new Bear(bearData);

    bear
      .save()
      .then(bear => {
        res.status(201).json(bear);
      })
      .catch(err => {
        if (err === 19){
          res.status(500).json({ errorMessage: "Please provide both species and latinName for the bear."  });
        } else {
          res.status(500).json({ errorMessage: "There was an error while saving the bear to the database" });
        }
      });
  }

module.exports = router;