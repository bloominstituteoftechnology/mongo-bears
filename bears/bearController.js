const router = require("express").Router();

const Bear = require("./bearModel");

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
    res.status(200).json({ route: "/api/bears/" + req.params.id });
  })
  .delete((req, res) => {
    res.status(200).json({
      status: "please implement DELETE functionality"
    });
  })
  .put((req, res) => {
    res.status(200).json({ status: "please implement PUT functionality" });
  });

module.exports = router;
