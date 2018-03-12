// import { Mongoose } from 'mongoose';

const express = require('express');
const helmet = require('helmet');
const cors = require('cors'); // https://www.npmjs.com/package/cors
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
<<<<<<< HEAD
=======

const bearRouter = require('./BearKeeper/bearRoutes');
>>>>>>> 17da6ba2e7569e1252a77600b35595a90200df57

const server = express();

server.use(helmet()); // https://helmetjs.github.io/
server.use(cors());   // https://medium.com/trisfera/using-cors-in-express-cac7e29b005b
server.use(bodyParser.json());

server.get('/', function(req, res) {
  res.status(200).json({ status: 'API Running' });
});

server.use('/bearkeeper', bearRouter);

mongoose
  .connect('mongodb://localhost/store')
  .then(connected => {
    console.log('Successfully Connected to MongoDB');
  })
  .catch(err => {
    console.log('Database connecttion failed');
  });


const port = process.env.PORT || 5005;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
});
