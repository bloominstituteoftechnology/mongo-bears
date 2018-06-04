const router = require('express').Router();
const Bear = require('./bearModel');

router
  .route('/')
  .get((req, res) => {
    Bear.find()
      .then( bears => {
        res.status(200).json(bears);
      })
      .catch( err => {
        res.status(404).json({ error: err })
      })
  })
  .post((req, res) => {
    const { species, latinName } = req.body;
    const newBear = Bear({ species, latinName });
    newBear.save()
      .then( bear => {
        res.status(201).json(bear);
      })
      .catch( err => {
        res.status(400).json({ error: err })
      })
  });

router
  .route('/:id')
  .get((req, res) => {
    res.status(200).json({ route: '/api/bears/' + req.params.id });
  })
  .delete((req, res) => {
    res.status(200).json({ status: 'please implement DELETE functionality' });
  })
  .put((req, res) => {
    res.status(200).json({ status: 'please implement PUT functionality' });
  });

module.exports = router;
