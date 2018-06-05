const router = require('express').Router();// declare that all routes for this address will be found on this router

const Bear = require('./bearModel');// pull in our Bear model

router
  .route('/')
  .get((req, res) => {
    Bear.find()// This will find All resources at that model.
      .then(bears => {
        res.status(200).json(bears);
      })
      .catch(err => res.status(500).json({ error: 'Error fetching bears' }));
  })
  .post((req, res) => {
    const { species, latinName } = req.body;
    const newBear = new Bear({ species, latinName });
    newBear
      .save()// this will 'insert' a document into the Bear collection
      .then(savedBear => {
        res.status(201).json(savedBear);
      })
      .catch(err => {
        res.status(422).json({ error: err });
      });
    });
    //res.status(201).json({ status: 'please implement POST functionality' });
   // });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Bear.findById(id)// find a specific resource in a colection by ID
    .then(foundBear => {
      res.status(200).json(foundBear);
    })
    .catch(err => {
      res.status(404).json({ error: 'No bear by that id in DB' });
    });
  })
  .delete((req, res) => {
    const { id } = req.params;
    Bear.findByIdAndRemove(id)
    .then(deletedBear => {
      res.status(200).json(deletedBear);
    })
    .catch(err => {
    res.status(404).json({ error: 'Bear not deleted' });
  })
})
  .put((req, res) => {
    const { id } = req.params;
    
    res.status(200).json({ status: 'please implement PUT functionality' });
    // findbyIdAndUpdate
  });

module.exports = router;
