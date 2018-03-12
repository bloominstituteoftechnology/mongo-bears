const express = require('express');

const BearDocuments = require('./BearModel.js');

const bearRouter = express.Router();

//=========================
//      Bear POST
//=========================

bearRouter.post('/api/bears', (req, res) => {
  const bearInfo = req.body;

  const { species, latinName } = bearInfo;

  if (!species  || !latinName) {
    res.status(400).json({ error: 'Missing Information' });
  }
  
  const bear = new BearDocuments(bearInfo);

  bear
    .save()
    .then(savedBear => {
      res.status(201).json(savedBear);
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error while saving the Bear to the Database", error: err });
    });
});

//=========================
//      Bear GET
//=========================

bearRouter.get('/api/bears', (req, res) => {
  BearDocuments.find()
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => {
      res.status(500).json({ error: "The information could not be retrieved.", error: err });
    });
});


//=========================
//      Bear GET by ID
//=========================

bearRouter.get('/api/bears/:id', (req, res) => {
  const { id } = req.params;

  BearDocuments.findById(id)
    .then(bear => {
      res.status(200).json(bear);
    })
    .catch(err => {
      res.status(404).json({ message: "The Bear with the specified ID does not exist.", error: err });
    });
});

//=========================
//      Bear Delete by ID
//=========================

bearRouter.delete('/api/bears/:id', (req, res) => {
  const { id } = req.params;

  BearDocuments.findByIdAndRemove(id)
    .then(bear => {
      if (!bear) {
      res.status(404)
      .json({ message: 'The Bear with the specified ID does not exist.' });
      }
      res.status(200).json(bear);
    })
    .catch(err =>
      res.status(500).json({ error: 'The Bear could not be removed' })
    );
});

//=========================
//      Bear Put
//=========================

bearRouter.put('/api/bears/:id', (req, res) => {
  const { id } = req.params;
 

  BearDocuments.findByIdAndUpdate(id, req.body)
    .then(bear => {
      if (!bear) {
      res.status(404)
      .json({ message: "The Bear with the specified ID does not exist." });
      }
      res.status(201).json(bear);
    })
    .catch(err => 
      res.status(500).json({ error: "The Bear information could not be modified." })
    );
})

module.exports = bearRouter;