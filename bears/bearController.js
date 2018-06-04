const bears = require('express').Router();
const Bear = require('./bearModel');

bears
  .route('/')
  .get((req, res) => {
    Bear.find()
      .then(bears => {
        res.status(200).json(bears);
      })
      .catch(error => {
        res.json(500).json({ error: 'The bear information could not be retrieved.'});
      });
  })
  .post((req, res) => {
    const { species, latinName } = req.body;
    
    if(!species || !latinName){
      res.status(400).json('Please provide both species and latinName for the bear.');
      return;
    }

    const newBear = new Bear({ species, latinName });
    newBear.save()
      .then(newBear => {
        res.status(201).json(newBear);
      })
      .catch(error => {
        res.json(500).json({ error: 'There was an error while saving the bear to the database.' });
      });
  });

bears
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Bear.findById(id)
      .then(bear => {
        if(bear){
          res.status(200).json(bear);
        } else {
          res.status(404).json({ error: 'The bear with the specified ID does not exist.' });
        }
      })
      .catch(error => {
        if (error.name === 'CastError') {
          res.status(404).json({ error: 'The bear with the specified ID does not exist.' });
        } else {
          res.status(500).json({ error: 'The bear information could not be retrieved.' });
        }
      });
  })
  .delete((req, res) => {
    const { id } = req.params;
    Bear.findByIdAndRemove(id)
      .then(deletedBear => {
        if(deletedBear){
          res.status(200).json(deletedBear);
        } else {
          res.status(404).json({ error: 'The bear with the specified ID does not exist.' });
        }
      })
      .catch(error => {
        if (error.name === 'CastError'){
          res.status(404).json({ error: 'The bear with the specified ID does not exist.' });
        } else {
          res.status(500).json({ error: 'The bear could not be removed.' });
        }
      });
  })
  .put((req, res) => {
    const { id } = req.params;
    const { species, latinName } = req.body;

    if (!species || !latinName) {
      res.status(400).json('Please provide both species and latinName for the bear.');
      return;
    }

    Bear.findByIdAndUpdate(id, { species: species, latinName: latinName }, { new:true })
      .then(updatedBear => {
        if (updatedBear) {
          res.status(200).json(updatedBear);
        } else {
          res.status(404).json({ error: 'The bear with the specified ID does not exist.' });
        }
      })
      .catch(error => {
        if (error.name === 'CastError') {
          res.status(404).json({ error: 'The bear with the specified ID does not exist.' });
        } else {
          res.status(500).json({ error: 'The bear information could not be modified.' });
        }
      });
  });

module.exports = bears;
