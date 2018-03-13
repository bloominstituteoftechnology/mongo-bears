const express = require("express");

const Bear = require("./Schema.js");

const BearRouter = express.Router();

BearRouter.post("/api/bears", function(req, res) {
  const BearInfo = req.body;
  if (!BearInfo.species || !BearInfo.latinName)
    res.status(400).send({
      errorMessage:
        "Please provide both species and and latinName for the Bear."
    });

  const bear = new Bear(BearInfo);

  bear
    .save()
    .then(savedBear => {
      res.status(201).send(savedBear);
    })
    .catch(err => {
      res.status(500).send({
        error: "There was an error while saving the Bear to the Database"
      });
    });
});

BearRouter.get("/api/bears", function(req, res) {
  Bear.find({})
    .then(bears => {
      res.status(200).send(bears);
    })
    .catch(err => {
      res.status(500).send({
        error: "The information could not be retrieved."
      });
    });
});

BearRouter.get("/api/bears/:id", function(req, res) {
  const { id } = req.params;
  Bear.findById(id)
    .then(foundBear => {
      if (!foundBear)
        res.status(404).send("The bear you are looking for does not exist!");
      else res.status(201).send(foundBear);
    })
    .catch(err => {
      res.status(500).send({
        error: "The information could not be retrieved."
      });
    });
});

BearRouter.put("api/bears/:id", function(req, res) {
	const { id } = req.params;
	const bearInfo = req.body;
	Bear.findByIdAndUpdate(id, bearInfo)
		.then(updatedBear => res.status(200).send(updatedBear))
		.catch(err => res.status(500).send("There was an error updateing the bear!", err));
})

BearRouter.delete("/api/bears/:id", function(req, res) {
	const { id } = req.params;
	Bear.findByIdAndRemove(id)
		.then(removedBear => res.status(200).send(removedBear))
		.catch(err => res.status(500).send("There was an error deleting the bear!", err));
})
module.exports = BearRouter;
