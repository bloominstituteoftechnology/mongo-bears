const express = require('express');
const helmet = require('helmet');
const cors = require('cors'); // https://www.npmjs.com/package/cors
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Bear = require('./BearModel.js'); 

const server = express();

server.use(helmet()); // https://helmetjs.github.io/
server.use(cors());   // https://medium.com/trisfera/using-cors-in-express-cac7e29b005b
server.use(bodyParser.json());

server.get('/', function(req, res) {
  res.status(200).json({ status: 'API Running' });
});


server.post('/api/bears', (req, res) => {
  const { species, latinName, createdOn } = req.body;
  if (!species || !latinName) {
    res.status(400).json({ errorMessage: "Please provide both species and latinName for the Bear."});
    return;
  }
  const bear = new Bear({ species, latinName, createdOn });
  bear.save()
  .then(savedBear => {
    res.status(201).json(savedBear);
  })
  .catch(err => {
    res.status(500).json({ errorMessage: "There was an error while saving the Bear to the Database"})
  })
})

server.get('/api/bears', (req, res) => {
  Bear.find({})
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => {
      res.statu(500).json({ error: "The information could not be retrieved."})
    })
})

server.get('/api/bears/:id', (req, res) => {
  const { id } = req.params;
//   for (i = 0; i < bear._id.length; i++) {

//   if (id !== Bear._id) {
//     res.status(404).json({ message: "The ID you are searching for does not exist."})
//   }
// }
  if (!Bear.find({_id: id})) {
    res.status(404).json({ message: "The Bear with the specified ID does not exist."})
  }
  Bear.findById(id, (err, bear) => {
    if (err) {
      res.status(500).json({ message: "The information could not be retreived."})
    }
    res.json(bear);
  })
})

server.delete('/api/bears/:id', (req, res) => {
  const { id } = req.params;
  Bear.findByIdAndRemove(id, (err) => {
    if (err) {
      res.status(500).json({ error: "The Bear could not be removed" })
    }
    res.json({ success: "Successfully removed bear"});
  })
})

server.put('/api/bears/:id', (req, res) => {
  const { id } = req.params;
  Bear.findByIdAndUpdate(id, {$set: req.body}, (err, bear) => {
    if (err) {
      res.status(500).json({ error: "The Bear information could not be modified" })
    }
    res.json({ success: "The Bear information was successfully modified"});
  })
})

  mongoose.connect('mongodb://localhost/store')
    .then(conn => {
      console.log('Successfully Connected to MongoDB');
    })
    .catch(err => {
      console.log('Database connection failed');
    }
  );

  const port = process.env.PORT || 5005;
  server.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
});
