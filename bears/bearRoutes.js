const express = require("express");

const Bear = require("./BearsModel");
const bearsRouter = express.Router();

bearsRouter.post("/", (req, res) => {
  const bearInfo = req.body;

  if (!bearInfo.species || !bearInfo.latinName) {
    res.status(400).json({
      errorMessage: "Please provide both species and latinName for the Bear.",
    });
  }

  const bear = new Bear(bearInfo);

  bear
    .save()
    .then(savedBear => {
      res.status(201).json(savedBear);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the Bear to the Database",
      });
    });
});

bearsRouter.get("/", (req, res) => {
  Bear.find({})
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => {
      res.status(500).json({
        error: "The information could not be retrieved.",
      });
    });
});

module.exports = bearsRouter;
