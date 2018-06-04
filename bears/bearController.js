const router = require('express').Router();
const Bear = require('./bearModel');


router
  .route('/')
  .get((req, res) => {
    Bear.find()
      .then(bears => {
        res.status(200).json(bears);
      })
      .catch(err => res.status(500).json({ error: 'Error fetching bears' }));
  })
  .post((req, res) => {
    const { species, latinName } = req.body;
    const newBear = new Bear({ species, latinName });

    if (!species || !latinName) {
      res.status(400).json({ errorMessage:'Please provide both species and latinName for the bear.'});
    }
    newBear
      .save() 
      .then(savedBear => {
        res.status(201).json(savedBear);
      })
      .catch(err => {
        res.status(500).json({ errorMessage: 'There was an error while saving the bear to the database' });
      });
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Bear.findById(id) 
      .then(foundBear => {
        if (foundBear) {
        res.status(200).json(foundBear);
        return;
      }
      else {
        res.status(500).json({ errorMessage: 'The bear information could not be retrieved.' });
      }
      })
      .catch(err => {
        res.status(404).json({ error: 'No bear by that id in DB' });
      });
  })
  .delete((req, res) => {
    const { id } = req.params;
    Bears.remove(id)
    .then(response => {
      if(!response) {
        res.status(404).json({ errorMessage: 'The bear with the specified ID does not exist.'});
      }})
      .catch(err => {
        res.status(500).json({ errorMessage: 'The bear could not be removed'});
      })
    
  })
  .put((req, res) => {
    const { id } = req.params;
    const { species, latinName } = req.body;
    Bears.update(id, {species, latinName})
    .then (response => {
      if (!response) {
        res.status(404).json({ errorMessage: 'The bear with the specified ID does not exist.' });
      }})
      .catch (error => {
        res.status(500).json({ errorMessage: 'The bear information could not be modified'});
      })
  });

module.exports = router;