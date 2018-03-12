const express = require('express');
const helmet = require('helmet');
const cors = require('cors'); // https://www.npmjs.com/package/cors
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Bear = require('./bears/BearModel.js');
const server = express();

server.use(helmet()); // https://helmetjs.github.io/
server.use(cors());   // https://medium.com/trisfera/using-cors-in-express-cac7e29b005b
server.use(bodyParser.json());

server.get('/', function(req, res) {
  res.status(200).json({ status: 'API Running' });
});

server.post('/api/bears', (req, res) => {
  const info = req.body;
  const { species, latinName } = info;

  const bear = new Bear(info);
  if (species && latinName) {
    bear
      .save()
      .then(saveBear => {
        res
          .status(201)
          .json(saveBear);
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: 'Couldnt save to db'});
      });
  } else {
    res
      .status(500)
      .json({
        errorMessage: 'Enter species and Latin name',
      });
  }
});
// return all bears
server.get('/api/bears', (req, res) => {
  Bear.find()
    .then(bears => {
      res
        .status(200)
        .json(bears);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'Couldnt get em'});
    });
});

mongoose
  .connect('mongodb://localhost/BearKeeper')
  .then(db => {
    console.log(`Connected to ${db.connections[0].name}`);
  })
  .catch(error => {
    console.log('Failed to connect to database');
  });

const port = process.env.PORT || 5005;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
});
