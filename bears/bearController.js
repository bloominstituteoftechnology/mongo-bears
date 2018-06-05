const router = require('express').Router();
const Bear = require('./bearModel');

router
  .route('/')
  .get((req, res) => {
    Bear.find()
    .then(bears => {
    res.status(200).json({ bears });
    })
    .catch(err => res.status(500).json({ errorMessage: "The bear information could not be retrieved." }));
  })
  .post((req, res) => {
    const { species, latinName, createdOn } = req.body;
    const newBear = new Bear({ species, latinName, createdOn });
    if (!species || !latinName) {
      res.status(400).json({ errorMessage: "Please provide both species and latinName for the bear." })
    } else {
    newBear
      .save()
      .then(savedBear => {
        res.status(201).json({ savedBear })
      })
      .catch(error => {
        res.status(500).json({ errorMessage: "There was an error while saving the bear to the IDBDatabase." })
      })
  }});

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Bear.findById(id)
      .then(foundBear => {
        res.status(200).json({ foundBear })
    })
      .catch(err => {
      res.status(500).json({ errorMessage: "The bear information could not be retrieved." });
  });
})

router
  .route('/:id')
  .delete((req, res) => {
    const { id } = req.params;
    Bear.findByIdAndRemove(id)
      .then(deletedBear => {
        res.status(200).json({ deletedBear });
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "This bear could not be removed." })
      })
  })

  router
    .route('/:id')
    .put((req, res) => {
    const { id } = req.params;
    const { species, latinName } = req.body
    Bear.findByIdAndUpdate(id, { species, latinName }, { upsert: true, setDefaultsOnInsert: true, new: true })
      .then(updatedBear => {
        res.status(200).json({ updatedBear })
      })
      .catch(error => {
      res.status(500).json({ errorMessage: "The bear information could not be modified." })
      })
  });

module.exports = router;
