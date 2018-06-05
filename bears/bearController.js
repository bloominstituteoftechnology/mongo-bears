const router = require('express').Router();

const Bear = require('./bearModel');

router
  .route('/')
  .get((req, res) => {
    Bear.find()
      .then(bears => {
        res.status(200).json(bears);
      })
      .catch(err => res.status(500).json({ error: 'The bear information could not be retrieved.' }));
  })
  .post((req, res) => {
    const { species, latinName } = req.body;
    const newBear = new Bear ({ species, latinName });
    if (!species || !latinName) {
      res.status(400).json({ error: 'Please provide both species and latinName for the bear.' });
      return;
    }
    newBear
      .save()
      .then(response => {
        console.log(response);
          res.status(201).json({ status: 'please implement POST functionality' });    
      })
      .catch(err => {
        res.status(500).json({ error: 'There was an error while saving the bear to the database.' });
      });
});

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Bear.findById(id)
      .then(response => {
        res.status(200).json({ success: 'Bear found.' });
      })
      .catch(err => {
        res.status(404).json({ error: 'The bear with the specified ID does not exist.'});
      });
      })
    .delete((req, res) => {
      const { id } = req.params;
    Bear.findByIdAndRemove(id)
      .then(response => {
        if (response == 0) {
          res.status(404).json({ error: 'The bear with the specified ID does not exist.' });
          return;
        }
        res.json({ success: 'Bear removed from DB.' });
      })
      .catch(err => 
        res.status(500).json({ error: 'The bear could not be removed.' })
      );
  })  
    .put((req, res) => {
      const { id } = req.params;
    const { species, latinName } = req.body;
    const updatedBear = { species, latinName };
    if (!species || !latinName) {
      res.status(404).json({ error: 'The bear with the specified ID does not exist.' })
      return;
    }
    Bear.findByIdAndUpdate(id, updatedBear)
      .then(response => {
        res.json(response);
      })
      .catch(err => 
        res.status(500).json({ error: 'The bear information could not be modified.'})
      );
});

module.exports = router;
