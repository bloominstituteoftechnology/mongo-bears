const express = require('express');
const helmet = require('helmet');
const cors = require('cors'); // https://www.npmjs.com/package/cors
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const db = mongoose.connect('mongodb://localhost/BearKeeper');

const Bear = require('./models/bearModel');

const bearRouter = express.Router();

app.use(helmet()); // https://helmetjs.github.io/
app.use(cors());   // https://medium.com/trisfera/using-cors-in-express-cac7e29b005b
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

bearRouter.route('/bears')
  .get((req, res) => {
    Bear.find((err, bears) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(bears);
      }
    })
  })
  .post((req, res) => {
    const bear = new Bear();
    console.log(bear);
    res.send(bear);
  });

bearRouter.route('/bears/:id')
  .get((req, res) => {
    Bear.findById(req.params.id, (err, bear) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(bear);
      }
    });
  });

app.use('/api', bearRouter);

app.get('/', function(req, res) {
  res.status(200).json({ status: 'API Running' });
});

const port = process.env.PORT || 5005;
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
});
