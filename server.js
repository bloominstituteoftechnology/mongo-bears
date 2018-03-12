const express = require("express");
const helmet = require("helmet");
const cors = require("cors"); // https://www.npmjs.com/package/cors
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Bear = require("./models.js");

mongoose.connect("mongodb://localhost/");

const server = express();

server.use(helmet()); // https://helmetjs.github.io/
server.use(cors()); // https://medium.com/trisfera/using-cors-in-express-cac7e29b005b
server.use(bodyParser.json());

server.get("/", function(req, res) {
  res.status(200).json({ status: "API Running" });
});

server.post("/api/bears", (req, res) => {
  const { species, latinName } = req.body;
  const bearSchema = new Bear({ species, latinName });

  if (!species || !latinName) {
    res
      .status(400)
      .json("Please provide both species and latinName for the Bear");
    return;
  }

  bearSchema
    .save()
    .then(savedBear => res.status(201).json(savedBear))
    .catch(err =>
      res.status(500).json({
        error: "There was an error while saving the Bear to the Database"
      })
    );
});

server.get("/api/bears", (req, res) => {
  Bear.find({})
    .then(bear => res.json(bear))
    .catch(err =>
      res.status(500).json({
        error: "The information could not be retrieved"
      })
    );
});

server.get("/api/bears/:id", (req, res) => {
  const { id } = req.params;

  Bear.findById(id)
    .then(foundBear => res.json(foundBear))
    .catch(err =>
      res.status(404).json({
        error: "The Bear with the specified ID does not exist."
      })
    );
});

server.delete('/api/bears/:id', (req, res)=> {
  const { id } = req.params;
  // const Bears = Bear.find(p => p.id === idDel);
  //   Bear = Bears.filter(p => p.id !== id);
  Bear.findByIdAndRemove(id)
    .then(bear => res.json("Succesfully deleted bear"))
    .catch(err =>
      res.status(500).json({
        error: "The information could not be retrieved"
      })
    );
})


server.put('/api/bears/:id', (req, res) => {
  
})




const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
});
