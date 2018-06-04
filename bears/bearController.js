const router = require("express").Router();

const Bear = require("./bearModel");

let errorMessage = (statusCode, message, res) => {
  res.status(statusCode).json({ error: message });
  return;
};

router
  .route("/")
  .get((req, res) => {
    //console.log("\nYou got into /api/bears/\n");
    //res.status(200).json({ route: "/api/bears/" });
    Bear.find()
      .then(bearsArray => {
        res.status(200).json(bearsArray);
      })
      .catch(() =>
        res
          .status(500)
          .json({ error: "The bear information could not be retrieved." })
      );
  })
  .post((req, res) => {
    const { species, latinName } = req.body;
    if (!species || !latinName) {
      res.status(400).json({
        errorMessage: "Please provide both species and latinName for the bear."
      });
    }
    const newBear = new Bear({ species, latinName });
    //when you post a new Bear, you have to use new Bear bc it goes through schema
    //it prop checks it and gives it id and date.
    newBear
      .save() // this will `insert` a document into the Bear collection
      .then(savedBear => {
        //console.log("req.body: ", req.body);
        //console.log("savedBear,:", savedBear);
        res.status(201).json(savedBear);
      })
      .catch(() => {
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
        res.json(bear);
      })
      .catch(err => {
        //console.log(err);
        if (err.name === "CastError") {
          errorMessage(404, `The bear with id of ${id} does not exist`, res);
        }
        errorMessage(500, "The bear information can not be retrieve", res);
      });
  })
  .delete((req, res) => {
    const { id } = req.params;
    Bear.findByIdAndRemove(id)
      .then(bear => {
        if (!bear) {
          errorMessage(
            400,
            `The bear with id of ${id} has already been deleted`,
            //extra error message when item has already been deleted
            res
          );
        }
        res.json(bear);
      })
      .catch(err => {
        if (err.name === "CastError") {
          errorMessage(404, `The bear with id of ${id} does not exist`, res);
        }
        errorMessage(500, "The bear can not be remove", res);
      });
  })
  .put((req, res) => {
    const { id } = req.params;
    const { species, latinName } = req.body;
    Bear.findByIdAndUpdate(id, { species, latinName })
      .then(bear => {
        res.json(bear);
      })
      .catch(err => {
        if (err.name === "CastError") {
          errorMessage(404, `The bear with id of ${id} does not exist`, res);
        }
        errorMessage(500, "The bear information can not be modify", res);
      });
  });

module.exports = router;
