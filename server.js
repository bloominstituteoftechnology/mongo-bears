const express = require('express');
const helmet = require('helmet');
const cors = require('cors'); // https://www.npmjs.com/package/cors
const bodyParser = require('body-parser');

//imported mongoose and the Schema
const mongoose = require("mongoose");
const BearSchema = require("./models/Bears");

const server = express();

//added to be safe
mongoose.Promise = global.Promise;

server.use(helmet()); // https://helmetjs.github.io/
server.use(cors());   // https://medium.com/trisfera/using-cors-in-express-cac7e29b005b
server.use(bodyParser.json());

//connection to mongoose and logging status
mongoose.connect("mongodb://localhost:27017/BearKeeper");
mongoose.connection
  .once("open", () => console.log(`Successfully connected to MongoDB.`))
  .on("error", (err) => console.log(`Database connection failed.`));

//initial get handler to test server
server.get('/', function(req, res) {
  res.status(200).json({ status: 'API Running' });
});

//get request handler for all bear documents in the bears collection
server.get("/api/bears", (req, res) => {
  BearSchema.find({})
  .then(response => res.send(response))
  .catch(err => {
    console.log(`There was an error getting the collection: ${err}`);
    res.send(`There was an error getting the collection`);
  })
})

//get request handler for a specific bear document
server.get("/api/bears/:id", (req, res) => {
  const bearId = req.params.id;
  BearSchema.findById(bearId)
  .then(response => res.send(response))
  .catch(err => {
    console.log(`There was an error geting a single document: ${err}`);
    res.send(`There was an error getting the document`);
  })
})


//post handler for new bear documents
server.post("/api/bears", (req, res) => {
  const bearSpecies = req.body.species;
  const bearLatin = req.body.latinName;
  const timeStamp = new Date();
  const newBear = new BearSchema({
    species: bearSpecies,
    latinName: bearLatin,
    createdOn: timeStamp,
  });
  newBear.save()
  .then(response => res.send(`This bear was added: ${response}`))
  .catch(err => {
    console.log(`There was an error: ${err}`);
    res.send(`There was an error!`)
  })
})

//delete handler for individual bear documents
server.delete("/api/bears/:id", (req, res) => {
  const bearId = req.params.id;
  BearSchema.findByIdAndRemove(bearId)
  .then(response => res.send(`This bear was removed: ${response}`))
  .catch(err => {
    console.log(`There was an error deleting a document: ${err}`);
    res.send(`There was an error deleting the document`);
  })
})

//put handler for individual bear documents
server.put("/api/bears/:id", (req, res) => {
  const bearId = req.params.id;
  const newBear = req.body;
  BearSchema.findByIdAndUpdate(bearId, {
    $set: newBear,
  })
  .then(response => res.json(newBear))
  .catch(err => {
    console.log(`There was an error updating a document: ${err}`);
    res.send(`There was an error updating the document`);
  })
})

const port = process.env.PORT || 5005;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
});
