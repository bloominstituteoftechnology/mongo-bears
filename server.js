const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors'); // https://www.npmjs.com/package/cors
const bodyParser = require('body-parser');

const bearRouter = require('./controllers/BearRoutes.js');

const server = express();

server.use(helmet()); // https://helmetjs.github.io/
server.use(cors()); // https://medium.com/trisfera/using-cors-in-express-cac7e29b005b
server.use(bodyParser.json());

server.use('/api', bearRouter);

server.get('/api', function(req, res) {
  res.status(200).json({ status: 'API Running' });
});

mongoose
  .connect('mongodb://localhost/bears')
  .then((con) => {
    console.log('Successful Connection');
  })
  .catch((err) => {
    console.log(err);
  });



const port = process.env.PORT || 5005;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
});
