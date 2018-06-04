const router = require('express').Router();
const Bear = require('./bearModel');

router
  .route('/')
  .get((req, res) => {
    console.log(Bear);
    Bear.find()
      .then(bears => {
        res.json({ bears });
      })
      .catch(error => res.status(500).json({ error: 'Error fetching bears' }));
  })
  .post((req, res) => {
    const { species, latinName, createOn } = req.body;
    const postBear = new Bear({ species, latinName, createOn });
    postBear
      .save()
      .then(postedBear => {
        res.status(201).json(postedBear);
      })
      .catch(error => {
        res.status(422).json({ error: error });
      });
  });

router
  .route('/:id')
  .get((req, res) => {
    Bear
      .findById(req.params.id)
      .then(bear => {
        if (bear) res.json({ bear });
        else res.status(404).json({ error: 'No such bear found.' })
      })
      .catch(error => res.status(500).json({ error: 'Error fetching bear' }));
  })
  .delete((req, res) => {
    Bear
      .findByIdAndDelete(req.params.id)
      .then(deletedBear => {
        if (deletedBear) res.json({ deletedBear });
        else res.status(404).json({ error: 'No such bear found' });
      })
      .catch(error => res.status(500).json({ error: 'Error deleting bear' }));
  })
  .put((req, res) => {
    const { species, latinName, createOn } = req.body;
    const putBear = { species, latinName, createOn };
    Bear
      .findByIdAndUpdate(req.params.id, putBear )
      .then(editedBear => {
        if (editedBear) res.json({ editedBear });
        else res.status(404).json({ error: 'No such bear found' });
      })
      .catch(error => res.status(500).json({ error: 'Error editing bear' }));
  });

module.exports = router;
