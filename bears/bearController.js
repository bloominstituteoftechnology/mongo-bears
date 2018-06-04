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
      .catch(() => res.status(500).json({ error: "Error fetching bears" }));
  })
  .post((req, res) => {
    res.status(201).json({ status: "please implement POST functionality" });
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
