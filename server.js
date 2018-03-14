const express = require('express');
const helmet = require('helmet');
const cors = require('cors'); // https://www.npmjs.com/package/cors
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const BearSchema = require("./models/Bears");

const server = express();

mongoose.Promise = global.Promise;

server.use(helmet()); // https://helmetjs.github.io/
server.use(cors());   // https://medium.com/trisfera/using-cors-in-express-cac7e29b005b
server.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/BearKeeper");
mongoose.connection
  .once("open", () => console.log(`Successfully connected to MongoDB.`))
  .on("error", (err) => console.log(`Database connection failed.`));

server.get('/', function(req, res) {
  res.status(200).json({ status: 'API Running' });
});

server.post("/api/bears", (req, res) => {
  const bearSpecies = req.body.species;
  const bearLatin = req.body.latinName;
  const timeStamp = new Date();
  const newBear = new BearSchema({
    species: bearSpecies,
    latinName: bearLatin,
    createdOn: timeStamp,
  })

  newBear.save()
  .then(response => res.send(`This bear was added: ${response}`))
  .catch(err => {
    console.log(`There was an error: ${err}`);
    res.send(`There was an error!`)
  })
})

const port = process.env.PORT || 5005;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
});
