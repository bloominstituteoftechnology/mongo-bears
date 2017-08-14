const express = require('express');
const server = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Bear = require('./models');

// mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/bears', { useMongoClient: true });

server.use(bodyParser.json());

server.get('/bears/', (req, res) => {
  // .find() is a method you can use to just simply pull in all the data from the collection.
  Bear.find({}, (err, bears) => {
    if (err) {
      throw err;
      return;
    }
    res.json(bears);
  });
});

server.post('/bears/', (req, res) => {
  const { species, latinName } = req.body;
  if (!species || !latinName) { // request validation
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Species and Latin Name required to create a bear'});
    return;
  }
  // here is where we actually create the new bear object. 
  const newBear = new Bear({ species, latinName });
  newBear.save((err) => {
    if (err) throw err;
    res.json(newBear);
  });
});

server.get('bears/:id', (req, res) => {
  const { id } = req.params;
  Bear.findById(id, (err, bear) => {
    if (err) throw err;
    res.json(bear);
  });
});


server.listen(port);

console.log(`App Listening on ${port}`);