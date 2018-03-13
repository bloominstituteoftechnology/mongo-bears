const express = require('express');
const helmet = require('helmet');
const cors = require('cors'); // https://www.npmjs.com/package/cors
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const daBears = require('./daBears/BearModel');

const server = express();

server.use(helmet()); // https://helmetjs.github.io/
server.use(cors()); // https://medium.com/trisfera/using-cors-in-express-cac7e29b005b
server.use(bodyParser.json());

server.post('/api/bears', (req, res) => {
  const { body } = req;
  const bear = new daBears(body);

  if (!body.hasOwnProperty('species') || !body.hasOwnProperty('latinName')) {
    res.status(400);
    res.send({
      errorMessage: 'Please provide both species and latinName for the Bear.'
    });
  }

  bear
    .save()
    .then((savedBear) => {
      res.status(201);
      res.send(savedBear);
    })
    .catch((err) => {
      res.status(500);
      res.send({
        error: 'There was an error while saving the Bear to the Database'
      });
    });
});

server.get('/api/bears', (req, res) => {
  daBears
    .find({})
    .then((bears) => {
      res.status(201);
      res.send(bears);
    })
    .catch((err) => {
      res.status(500);
      res.send({ error: 'The information could not be retrieved.' });
    });
});

server.get('/api/bears/:id', (req, res) => {
  let { id } = req.params;

  if (!id) {
    res.status(422);
    res.send(`No 'ID' was given`);
  }

  daBears
    .findById(id)
    .then((bear) => {
      if (!bear) {
        res.status(404);
        res.send(`No bear found for 'ID' = ${id}`);
      } else {
        res.status(201);
        res.send(`Your Bear good Sir, ${bear}`);
      }
    })
    .catch((fail) => {
      res.status(500);
      res.send({ error: 'The information could not be retrieved.' });
    });
});

server.delete('/api/bears/:id', (req, res) => {
  let { id } = req.params;

  if (!id) {
    res.status(422);
    res.send(`No 'ID' was given`);
  }

  daBears
    .findById(id)
    .then((bear) => {
      if (!bear) {
        res.status(404);
        res.send(`No bear found for 'ID' = ${id}`);
      }
      daBears
        .remove(bear)
        .then((removed) => {
          res.status(201);
          res.send(`${bear} was removed`);
        })
        .catch((err) => {
          res.status(500);
          res.send({ error: 'The Bear could not be removed' });
        });
    })
    .catch((fail) => {
      res.status(500);
      res.send({ error: 'The information could not be retrieved.' });
    });
});

server.put('/api/bears/:id', (req, res) => {
  let { id } = req.params;
  let { body } = req;

  if (!id) {
    res.status(422);
    res.send(`No 'ID' was given`);
  } else {
    daBears
      .findByIdAndUpdate(id, body)
      .then((bear) => {
        res.status(201);
        res.send(`Updated Bear: ${bear}`);
      })
      .catch((err) => {
        res.status(404);
        res.send(`No bear found for the ID given`);
      });
  }
});

mongoose
  .connect('mongodb://localhost/daBears')
  .then((pass) => {
    console.log('Connected to MONGO');
  })
  .catch((fail) => {
    console.log(fail);
  });

const port = process.env.PORT || 5005;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
});
