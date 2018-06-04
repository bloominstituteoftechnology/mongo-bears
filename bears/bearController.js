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
    newBear
      .save()
      .then(savedBear => {
        res.status(201).json(savedBear);
      })
      .catch(err => {
        res.status(422).json({ error: err });
      });
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Bear.findById(id)
      .then(foundBear => {
        res.status(200).json(foundBear);
      })
      .catch(err => {
        res.status(404).json({ error: 'No bear by that id in DB' });
      });
  })
  .delete((req, res) => {
    const { id } = req.params;
    console.log(id);
    Bear.findByIdAndRemove(id)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => {
        res.status(404).json({ error: 'No bear by that id in DB' });
      })
  })
  .put((req, res) => {
    const { id } = req.params;
    const { species, latinName } = req.body;
    const bear = { species, latinName };
    console.log(id);
    console.log(bear);
    Bear.findByIdAndUpdate(id, bear)
      .then(bear => {
        res.status(200).json(bear);
      })
      .catch(err => {
        res.status(404).json({ error: 'No bear by that id in DB' });
      })
  });

module.exports = router;