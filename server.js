const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

const bearController = require("./bears/bearController");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/bears", bearController);

//Basic Server
server.get("/", function(req, res) {
  res.status(200).json({ api: "bears running" });
});

mongoose.Promise = global.Promise;
// mongoose.connect(
//   "mongodb://localhost/27017/dbBears",
//   {},
//   err => {
//     // declare where we're going to connect this is the equivilent of using
//     //`use dbBears` in the mongo shell
//     if (err) console.log("Database connection failed");
//     console.log("Mongoose connected us to Derrick's DB");
//   }
// );

mongoose
  .connect("mongodb://localhost/dbBears") //if dbBears does not exist, mongoose will create it
  .then(() => console.log("Mongoose connected us to Derrick's dbBears"))
  .catch(err => console.log(`Error connecting to database: ${err}`));

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`\n=== Derrick's API running on http://localhost:${port} ===\n`);
});
