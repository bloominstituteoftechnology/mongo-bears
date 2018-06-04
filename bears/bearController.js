const router = require('express').Router();

const Bears = require('./bearModel');

router
  .route('/')
  .get((req, res) => {
    Bears.find()
      .then(bears => {
        res.status(200).json(bears);
      })
      .catch(error => {
        res.status(500).json({ error: 'The bear information could not be retrieved.' })
      })
  })
  .post((req, res) => {
    const { species, latinName } = req.body;
    const newBear = new Bears({ species, latinName });
    if (!species || !latinName) {
      res.status(400).json({ error: '"Please provide both species and latinName for the bear." ' })
    }
    newBear.save()
      .then(savedBear => {
        console.log(savedBear);
        res.status(201).json(savedBear);
      })
      .catch(error => {
        res.status(500).json({ error: 'There was an error while saving the bear to the database' })
      });
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Bears.findById(id)
      .then(foundBear => {
        if (foundBear) {
          res.status(200).json(foundBear);
          return;
        } else {
          res.status(404).json({ error: `Bear with id ${id} does not exist` })
        }

      })
      .catch(error => {
        res.status(500).json({ error: 'The bear information could not be retrieved.' })
      });
  })
  .delete((req, res) => {
    const { id } = req.params;
    Bears.findByIdAndRemove(id)
      .then(response => {
        if (response) {
          res.json({ success: `Bear with id ${id} was deleted successfully` })
        } else {
          res.status(404).json({ error: 'The bear with the specified ID does not exist' })
        }
        console.log(response);

      })
      .catch(error => {
        res.status(500).json({ error: 'The bear could not be removed.' })
      })
  })
  .put((req, res) => {
    const { id } = req.params;
    const { species, latinName } = req.body;
    const modifiedBear = { species, latinName }
    Bears.findByIdAndUpdate(id, modifiedBear)
      .then(response => {
        console.log(response)
        if (response) {
          Bears.findById(id)
            .then(response => {
              res.json(response)
              return;
            })
            .catch(error => {
              error: 'There was an error while retrieving the updated bear information.'
            })
        } 
      })
      .catch(error => {
        res.status(500).json({ error: `Bear with id ${id} could not be updated` })
      })
  });

module.exports = router;
