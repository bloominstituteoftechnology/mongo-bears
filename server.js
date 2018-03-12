const express = require('express');
const helmet = require('helmet');
const cors = require('cors'); // https://www.npmjs.com/package/cors
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Bear = require('./models.js');

mongoose.connect('mongodb://localhost/');

const server = express();

server.use(helmet()); // https://helmetjs.github.io/
server.use(cors());   // https://medium.com/trisfera/using-cors-in-express-cac7e29b005b
server.use(bodyParser.json());

server.get('/', function(req, res) {
  res.status(200).json({ status: 'API Running' });
});

server.post(('/api/bears'), (req, res) => {
  const { species, latinName } = req.body;
  const bearSchema = new Bear( {species, latinName} );

    if  (! species || !latinName) {
      res.status(400).json('Please provide both species and latinName for the Bear')
      return;
    }

    bearSchema.save((err) => {
      if (err) throw err;
      //   res.status(500)
      //   res.json(err: "There was an error while saving the Bear to the Database");
      //   return;
      // }
      res.status(201).json(bearSchema);
    });
});

server.get('/api/bears', (req, res) => {

})




const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
});
