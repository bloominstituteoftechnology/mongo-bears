const router = require('express').Router();
const Bear = require("./bearModel");

let errorMessage = (statusCode, message, res) => {
  res.status(statusCode).json({error: message});
  return;
};

router
  .route('/')
  .get((req, res) => {
    Bear.find()
      .then(bears => {
        res.status(200).json(bears);
      })
      .catch(err => {
        errorMessage(500, "Error fetching bears", res);
      })
  })
  .post((req, res) => {
    const { species, latinName } = req.body;
    if(!species || !latinName) {
      errorMessage(400, "Please provide both species and latinName for the bear.", res);
    }
    const newBear = new Bear({species, latinName});
    newBear.save()
      .then(savedBear => {
        res.status(201).json(savedBear);
      })
      .catch(err => {
        errorMessage(500, "There was an error while saving the bear to the database", res);
      });
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Bear.findById(id)
    .then(bear => {
      res.json(bear);
    })
    .catch(err => {
      console.log(err);
      if(err.name === "CastError") {
        errorMessage(404, `The bear with id of ${id} does not exist`, res);
      }
      errorMessage(500, "The bear information can not be retrieve", res);
    })
  })
  .delete((req, res) => {
    const { id } = req.params;
    Bear.findByIdAndRemove(id)
      .then(bear => {
        res.json(bear);
      })
      .catch(err => {
        if(err.name === "CastError") {
          errorMessage(404, `The bear with id of ${id} does not exist`, res);
        }
        errorMessage(500, "The bear can not be remove", res);
      })
  })
  .put((req, res) => {
    const { id } = req.pargitams;
    const { species, latinName } = req.body;
    Bear.findByIdAndUpdate(id, {species, latinName})
      .then(bear => {
        res.json(bear);
      })
      .catch(err => {
        if(err.name === "CastError") {
          errorMessage(404, `The bear with id of ${id} does not exist`, res);
        }
        errorMessage(500, "The bear information can not be modify", res);
      })
  });

module.exports = router;
