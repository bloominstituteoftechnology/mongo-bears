const router = require("express").Router();

const bearModel = require("./bearModel");

let errorMessage = (statusCode, message, res) => {
  res.status(statusCode).json({ error: message });
};

router
  .route("/")
  .get((req, res) => {
    bearModel
      .find()
      .then(bearsArray => res.json(bearsArray))
      //res.status(200) is not needed because that is default
      .catch(err => res.status(500).json({ error: err.message }));
  })
  .post((req, res) => {
    const { species, latinName } = req.body;
    if (!species || !latinName) {
      return res.status(400).json({
        errorMessage: "Please provide both species and latinName for the bear."
      });
    }
    const newBear = bearModel({ species, latinName });
    //make newBear by sending species and latinName through bearModel/Schema
    newBear
      .save() // this will `insert` a document into the bears collection
      .then(savedBear => res.status(201).json(savedBear)) //201 means successfully created
      .catch(err => res.status(500).json({ errorMessage: err.message }));
  });
router
  .route("/:id")
  .get((req, res) => {
    const { id } = req.params;
    bearModel
      .findById(id)
      .then(bear => res.json(bear))
      .catch(err => {
        if (err.name === "CastError") {
          errorMessage(404, `The bear with id of ${id} does not exist`, res);
          return;
        }
        errorMessage(500, "The bear information can not be retrieve", res);
        return;
      });
  })
  .delete((req, res) => {
    const { id } = req.params;
    bearModel
      .findByIdAndRemove(id)
      .then(bear => {
        if (!bear) res.status(400).json("Bear has already been deleted");
        res.json(bear);
      })
      .catch(err => {
        if (err.name === "CastError") {
          errorMessage(404, `The bear with id of ${id} does not exist`, res);
        }
        errorMessage(500, "The bear cannot be removed", res);
      });
  })
  .put((req, res) => {
    const { id } = req.params;
    const { species, latinName } = req.body;
    bearModel
      .findByIdAndUpdate(id, { species, latinName })
      .then(bear => res.json(bear))
      .catch(err => {
        if (err.name === "CastError") {
          errorMessage(404, `The bear with id of ${id} does not exist`, res);
        }
        errorMessage(500, "The bear information can not be modify", res);
      });
  });

module.exports = router;
