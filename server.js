const express = require("express");
const helmet = require("helmet");
const cors = require("cors"); // https://www.npmjs.com/package/cors
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Bear = require("./bears/Bears.js");
const server = express();

server.use(helmet()); // https://helmetjs.github.io/
server.use(cors()); // https://medium.com/trisfera/using-cors-in-express-cac7e29b005b
server.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost/BearSchema")
  .then(db => {
    console.log("Connected to mongo");
  })
  .catch(error => {
    console.log("Error");
  });

server.get("/", function(req, res) {
  res.status(200).json({ status: "API Running" });
});

server.post("/api/bears", (req, res) => {
  const bearBody = req.body;
  const { species, latinName } = bearBody;
  const bear = new Bear(bearBody);
  bear
    .save()
    .then(savedBear => {
      res.status(201).json(savedBear);
    })
    .catch(error => {
      res.status(500).json({
        error: "Please put both species and latinName for the bear"
      });
    });
});

server.get("/api/bears", (req, res) => {
  Bear.find({})
    .then(bear => {
      res.status(200).json(bear);
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
});

const port = process.env.PORT || 5005;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
});
