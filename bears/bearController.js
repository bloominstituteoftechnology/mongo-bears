const router = require('express').Router();

const Bear = require('./bearModel');

// Creating API endpoints.
router
  .route('/')
  .get((req, res) => {
    Bear
      .find()
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
        res.status(201).json({response});
      })
      .catch(err => {
        res.status(500).json({ error: 'There was an error while saving the bear to the database.' });
      });
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Bear
      .findById(id)
      .then(response => {
        console.log(response);
        if (response === null) {
          res.status(404).json({ error: 'No bear by that ID in database.' });
          return;
        }
        res.status(200).json(response);
      })
      .catch(err => {
        res.status(404).json({ error: 'The bear with the specified ID does not exist.'});
      });
  })
  .delete((req, res) => {
    const { id } = req.params;
    Bear
      .findByIdAndRemove(id)
      .then(response => {
        console.log(response);
        if (response == null) {
          res.status(404).json({ error: 'The bear with the specified ID does not exist.' });
          return;
        }
        res.json({ success: `Bear removed from DB.`, resource: response });
      })
      .catch(err => 
        res.status(500).json({ error: 'The bear could not be removed.' })
      );
  })
  .put((req, res) => {
    const { id } = req.params;
    const updatedBear = ({ species, latinName } = req.body);
    Bear
      .findByIdAndUpdate(id, updatedBear, { new: true })
      .then(response => {
        if (response === null) {
          res.status(404).json({ error: 'No bear by that ID in the database.'});
          return;
        }
        res.json({ success: 'Bear updated.', resource: response });
      })
      .catch(err => {
        res.status(500).json({ error: 'The bear information could not be modified.'})
      });
});

module.exports = router;