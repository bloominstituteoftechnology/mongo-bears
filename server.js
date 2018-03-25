const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const Bear = require('./models');
const bodyParser = require('body-parser');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

// allow server to parse JSON bodies from POST/PUT/DELETE requests
server.use(helmet());
server.use(cors());
server.use(bodyParser.json());

mongoose
.connect('mongodb://localhost/BearSchema')/* BearSchema') */
.then(db => {
  console.log('Connected to mongo');
})
.catch(error => {
  console.log ('An error occurred');
});

server.get("/", function(req, res) {
  res.status(200).json({ status: "API Running" });
});

/* mongoose.Promise = global.Promise;
const connect = mongoose.connect('mongodb://localhost/bears', {
  useMongoClient: true,
}); */
server.post('/api/bears', (req, res) => {
  const bearBody = req.body;
  const { species, latinName } = bearBody;
  const bear = new Bear(bearBody);
  /* if (!species || !latinName) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'You must provide the species & Latin name' });
    return;
  } */
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
  Bear
  .find({})
  .then(bear => {
    res.status(200).json(bear);
  })
  .catch(error => {
    res.status(500).json({ error: error });
  });
});
server.get("/api/bears/:id", (req, res) => {
  const bearId = req.params.id;
  Bear.findById(bearId)
  .then(bear => {
    res.status(200).json(bear);
  })
  .catch(error => {
    res.status(500).json({ error: error });
  });
});

server.delete("/api/bears/:id", (req, res) => {
  const bearId = req.params.id;
  console.log(bearId);
  Bear.findByIdAndRemove(bearId)
  .then(bear => {
    res.status(200).json(bear);
  })
  .catch(error => {
    res.status(500).json({ error: error });
  });
});

server.put("/api/bears/:id", (req, res) => {
  const { id } = req.params;
  const { species, latinName } = req.body;
  Bear.findByIdAndUpdate(id, req.body)
  .then(bear => {
    res.status(201).json(bear);
  })
  .catch(error => {
    res.status(500).json({ error: error });
  });
 });

/* eslint no-console: 0 */
  const port = process.env.PORT || 3000;
  server.listen(port, () => {console.log(`Server Listening on port ${port}`);
  });

/* }, (err) => {
  console.log('\n************************');
  console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
  console.log('************************\n');
}); */
