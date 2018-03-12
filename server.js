const express = require('express');
const helmet = require('helmet');
const cors = require('cors'); // https://www.npmjs.com/package/cors
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const db = mongoose.connect('mongodb://localhost/BearKeeper');

const Bear = require('./models/bearModel');

app.use(helmet()); // https://helmetjs.github.io/
app.use(cors());   // https://medium.com/trisfera/using-cors-in-express-cac7e29b005b
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const bearRouter = require('./routes/bookRoutes')(Bear);

app.use('/api', bearRouter);

app.get('/', function(req, res) {
  res.status(200).json({ status: 'API Running' });
});

const port = process.env.PORT || 5005;
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
});
