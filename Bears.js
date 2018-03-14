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

BearRouter.put("/api/bears/:id", function(req, res) {
  const { id } = req.params;
  const bearInfo = req.body;
  if (!bearInfo.species || !bearInfo.latinName) {
     res.status(400).send({
        errorMessage:
          "Please provide both species and and latinName for the Bear."
        })
     }
     else {
    Bear.findByIdAndUpdate(id, bearInfo, {new: true, runValidators: true })
     .then(updatedBear => {
        if (!updatedBear) {
        res
          .status(404)
          .send({
             errorMessage: "The Bear with the specified ID does not exist."
             });
        } else {
           res.status(200).send(updatedBear);
        }
      })
      .catch(err => 
       res.status(500).send({errorMessage: "There was an error updateing the bear!"}) 
      );
    }
 })

BearRouter.delete("/api/bears/:id", function(req, res) {
  const { id } = req.params;
  Bear.findByIdAndRemove(id)
    .then(removedBear => { 
			if (!removedBear) {
			 res
			   .status(404)
				 .send({
          errorMessage: "The Bear with the specified ID does not exist." 
				});
			} else {
				res.status(200).send(removedBear);
		  }
		})
    .catch(err =>
      res.status(500).send({errorMessage: "There was an error deleting the bear!"})
    );
});

module.exports = BearRouter;
