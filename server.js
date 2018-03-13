const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors'); // https://www.npmjs.com/package/cors
const bodyParser = require('body-parser');
const Bears = require('./model.js');
const server = express();
mongoose.connect('mongodb://localhost/bears');

server.use(helmet()); // https://helmetjs.github.io/
server.use(cors());   // https://medium.com/trisfera/using-cors-in-express-cac7e29b005b
server.use(bodyParser.json());

server.get('/', function (req, res) {
  res.status(200).json({ status: 'API Running' });
});
server.post('/api/bears', (req, res) => {
  console.log('in post bears');
  if (!req.body) {
    res.status(400);
    res.send({ errorMessage: "Please provide all info." });
  }
  const species = req.body.species;
  const latinName = req.body.latinName;
  if (!species || !latinName) {
    res.status(400);
    res.send({ errorMessage: "Please provide both species and latinName for the Bear." });
  }
  const bear = new Bears({ species, latinName });
  console.log('bear', bear);
  bear.save((err) => {
    if (err) {
      res.status(500);
      res.send({ error: "There was an error while saving the Bear to the Database" })
      throw err;
    }
    res.status(201);
    res.json(bear);
    //res.send(bear);
  })
})
server.get('/api/bears/', (req, res) => {
  Bears.find({}, (err, bears) => {
    if (err) {
      res.status(500);
      res.send({ error: "The information could not be retrieved." })
      throw err;
    }
    res.json(bears);
  })
});

server.get('/api/bears/:id', (req, res) => {

  const { id } = req.params;
  Bears.findById(id, (err, bear) => {
    if (err) {
      res.status(500);
      res.send({ error: "The information could not be retrieved." })
      throw err;
    }
    if (!bear) {
      res.status(404);
      res.send({ message: "The Bear with the specified ID does not exist." })
      return;
    }
    res.json(bear);
  })
});
server.delete('/api/bears/:id', (req, res) => {
  console.log(req.params);
  console.log(req.body);
  const { id } = req.params;

  Bears.findById(id, (err, bear) => {

    if (!bear) {
      res.status(404);
      res.send({ message: "The Bear with the specified ID does not exist." })
      return;
    }
    Bears.deleteOne({ _id: id }, (err) => {
      if (err) {
        res.status(500);
        res.send({ error: "The Bear could not be removed" })
        throw err;
      }
      res.status(200);
      res.json(bear)
    });

  })
});

server.put('/api/bears/:id', function (req, res) {
  const id = req.params.id;
  const bearUpdate = req.body;
  //console.log(bearUpdate)
  //  Bears.findById(id, (err, bear) => {

  /* if (!bear) {
     res.status(404);
     res.send({ message: "The Bear with the specified ID does not exist." })
     return;
   }*/
  Bears.findByIdAndUpdate(id, bearUpdate, { new: true })
    .then(
      (bear) => {
        if (bear === null) {
          console.log(bear)
          res.status(404);
          res.send({ message: "The Bear with the specified ID does not exist." })
          return;
        }
        res.status(200);
        res.json(bear);
      })
    .catch(
      (err) => {
        console.log(err);
        if (err) {
          if (err.name === 'CastError') {
            res.status(404);
            res.send({ message: "The Bear with the specified ID does not exist." })
            return;
          } else {
            res.status(500);
            res.send({ error: "The Bear information could not be modified." })
            throw err;
          }


          // }){ message: "The Bear with the specified ID does not exist." }.
        }
      }
    );
});
const port = process.env.PORT || 5005;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
}); 

