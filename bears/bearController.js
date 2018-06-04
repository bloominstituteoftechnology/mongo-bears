const router = require("express").Router();
const Bear = require("./bearModel");

router
  .route("/")
  .get((req, res) => {
    Bear.find()
      .then(bears => {
        res.json({ bears });
      })
      .catch(error => {
        res.status(500).json({
          errorMessage: "The bear information could not be retrieved."
        });
      });
  })
  .post((req, res) => {
    const { species, latinName } = req.body;
    if (!species || !latinName) {
      res.status(400).json({
        errorMessage: "Please provide both species and latinName for the bear."
      });
    }
    const newBear = new Bear({ species, latinName });
    newBear
      .save()
      .then(bear => {
        res.status(201).json({ bear });
      })
      .catch(error => {
        res.status(500).json({
          errorMessage:
            "There was an error while saving the bear to the database"
        });
      });
  });

router
  .route("/:id")
  .get((req, res) => {
    const { id } = req.params;
    Bear.findById(id)
      .then(bear => {
        res.json({ bear });
      })
      .catch(error => {
        if (error.name === "CastError") {
          res.status(404).json({
            errorMessage: "The bear with the specified ID does not exist."
          });
        } else {
          res.status(500).json({
            errorMessage: "The bear information could not be retrieved."
          });
        }
      });
  })
  .delete((req, res) => {
    const { id } = req.params;
    Bear.findByIdAndRemove(id)
      .then(bear => {
        res.json({ bear });
      })
      .catch(error => {
        if (error.name === "CastError") {
          res.status(404).json({
            errorMessage: "The bear with the specified ID does not exist."
          });
        } else {
          res
            .status(500)
            .json({ errorMessage: "The bear could not be removed" });
        }
      });
  })
  .put((req, res) => {
    const { id } = req.params;
    const { species, latinName } = req.body;
    if (!species || !latinName) {
      res.status(400).json({
        errorMessage: "Please provide both species and latinName for the bear."
      });
    }
    Bear.findByIdAndUpdate(id, { species, latinName })
      .then(bear => {
        Bear.findById(id)
          .then(bear => {
            res.json({ bear });
          })
          .catch(error => {
            res.status(500).json({
              errorMessage: "The bear information could not be retrieved."
            });
          });
      })
      .catch(error => {
        if (error.name === "CastError") {
          res.status(404).json({
            errorMessage: "The bear with the specified ID does not exist."
          });
        } else {
          res.status(500).json({
            errorMessage: "The bear information could not be modified."
          });
        }
      });
  });

module.exports = router;
