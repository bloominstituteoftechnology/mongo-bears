const express = require('express');
const helmet = require('helmet');
const cors = require('cors'); // https://www.npmjs.com/package/cors
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const server = express();

const Bear = require('./BearModel.js');
const bearRouter = require('./bearRoutes.js');

server.use(helmet()); // https://helmetjs.github.io/
server.use(cors());   // https://medium.com/trisfera/using-cors-in-express-cac7e29b005b
server.use(bodyParser.json());








  mongoose
    .connect('mongodb://localhost/BearKeeper')
    .then(db => {
      console.log('connected to mongo')
    })
    .catch(err => {
      console.log('error connecting to mongo')
    })
  const port = process.env.PORT || 5005;
  server.listen(port, () => {
    console.log(`API running on http://localhost:${port}.`);
  });
