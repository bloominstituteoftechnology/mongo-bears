const express = require('express');

const Bear = require('./BearModel.js');

const bearsRouter = express.Router();

// /api/bears
bearsRouter.post('/', function(req, res) {
    const bearInfo = req.body;
    const bear = new Bear(bearInfo);
    bear
    .save()
    .then(savedBear => {
        res.status(201).json(savedBear);
    })
    .catch(err => {
        // if (!bearInfo.species || !bearInfo.latinName) {
        //     res.status(400).json({ errorMessage: "Please provide both species and latinName for the Bear." });
        // }
        res.status(500).json({ msg: 'error creating a bear', error: err });
    }); // returns a promise
});

bearsRouter.get('/', function(req, res) {
  Bear.find({})
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => {
      res.status(500).json({ error: "The information could not be retrieved." });
    });
});

// bearsRouter.get('/api/bears/:id', function(req, res) {
//     Bear.findOne({
//         _id: req.params.id,
//     })
//     .then(bears => {
//         res.status(200).json(bears[id]);
//     })
//     .catch(err => {
//         res.status(404).json({ message: "The Bear with the specified ID does not exist." });
//     })
//     .catch(err => {
//         res.status(500).json({ error: "The information could not be retrieved." });
//     });
// });

// bearsRouter.delete('/api/bears/:id', function(req, res) {
//     Bear.find({})
//       .then(bears => {
//         res.status(200).json(bears);
//       })
//       .catch(err => {
//         res.status(500).json({ error: "The information could not be retrieved." });
//       });
//   });

module.exports = bearsRouter;
