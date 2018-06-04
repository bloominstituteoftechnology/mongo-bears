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
        res.status(500).json({ error: 'Error fetching bears' })
      })
  })
  .post((req, res) => {
    const { species, latinName } = req.body;
    const newBear = new Bears({ species, latinName });
    if(!species || !latinName) {
      res.status(400).json({ errorMessage: "Please provide both species and latinName for the bear." })
    }
    newBear.save()
      .then(savedBear => {
        console.log(savedBear);
        res.status(201).json(savedBear);
      })
      .catch(error => {
        res.status(500).json({ errorMessage: "There was an error while saving the bear to the database" })
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
          res.status(500).json({ errorMessage: "The bear information could not be retrieved." })
        }
      })
      .catch(error => {
        res.status(500).json({ errorMessage: "The bear information could not be retrieved." })
      });
  })
  .delete((req, res) => {
    const { id } = req.params;
      Bears.findByIdAndRemove(id)
        .then(response => {
          if (!response) {
            res.status(404).json({ errorMessage: "The bear with the specified ID does not exist." })
          }
          res.json({ success: `Bear with ${id} found and deleted!` })
        })
        .catch(err => {
          res.status(500).json({ errorMessage: "The bear could not be removed" })
        })
  })
  .put((req, res) => {
    const { id } = req.params;
    const { species, latinName } = req.body;
      Bears.findByIdAndUpdate(id, { species, latinName })
        .then( response => {
          if (!response) {
            res.status(404).json({ errorMessage: "The bear with the specified ID does not exist." })
          }
          res.json(response);
        })
        .catch (error => {
          res.status(500).json({ error: `Bear with id of ${id} could not be updated`})
        })
  });

module.exports = router;