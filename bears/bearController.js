const router = require('express').Router();
const Bear = require('./bearModel');

router
  .route('/')
  .get((req, res) => {
    Bear.find()
      .then(bears => {
        res.status(200).json(bears);
      })
      .catch(err => res.status(500).json({
        error: 'Error fetching bears'
      }));
  })
  .post((req, res) => {
    const {
      species,
      latinName
    } = req.body;
    const newBear = new Bear({
      species,
      latinName
    });
    newBear
      .save()
      .then(savedBear => {
        res.status(201).json(savedBear);
      })
      .catch(err => {
        res.status(422).json({
          error: err
        });
      });
  });

router
  .route('/:id')
  .get((req, res) => {
    const {
      id
    } = req.params;
    Bear.findById(id)
      .then(foundBear => {
        res.status(200).json(foundBear);
      })
      .catch(err => {
        res.status(404).json({
          error: 'No bear by that id in DB'
        });
      });
  })
  .delete((req, res) => {
    const {
      id
    } = req.params;
    Bears.findByIdAndRemove(id)
      .then(response => {
        if (!response) {
          res.status(404).json({
            errorMessage: "The bear with the specified ID does not exist."
          })
        }
        res.json({
          success: `Bear with ${id} found and deleted!`
        })
      })
      .catch(err => {
        res.status(500).json({
          errorMessage: "The bear could not be removed"
        })
      })
  })
  .put((req, res) => {
    const {
      id
    } = req.params;
    const {
      species,
      latinName
    } = req.body;
    Bears.findByIdAndUpdate(id, {
        species,
        latinName
      })
      .then(response => {
        if (!response) {
          res.status(404).json({
            errorMessage: "The bear with the specified ID does not exist."
          })
        }
        res.json(response);
      })
      .catch(error => {
        res.status(500).json({
          error: `Bear with id of ${id} could not be updated`
        })
      })
  });


module.exports = router;