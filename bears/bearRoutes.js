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

bearsRouter.get("/:id", (req, res) => {
  const id = req.params.id;

  Bear.findById(id)
    .then(bear => {
      if (bear) {
        res.status(200).json(bear);
      } else {
        res.status(404).json({
          message: "The Bear with the specified ID does not exist",
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "The information could not be retrieved",
      });
    });
});

bearsRouter.delete("/:id", (req, res) => {
  const id = req.params.id;

  Bear.findByIdAndRemove(id)
    .then(removedBear => {
      if (removedBear) {
        res.status(200).json({ message: "Successfully deleted" });
      } else {
        res.status(404).json({
          message: "The Bear with the specified ID does not exist",
        });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The Bear could not be removed" });
    });
});

bearsRouter.put("/:id", (req, res) => {
  const id = req.params.id;
  const updatedBear = req.body;

  Bear.findByIdAndUpdate(id, updatedBear)
    .then(bear => {
      if (bear) {
        res.status(200).json(updatedBear);
      } else {
        res.status(404).json({
          message: "The Bear with the specified ID does not exist",
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "The Bear information could not be modified.",
      });
    });
});

module.exports = bearsRouter;
