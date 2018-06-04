const router = require('express').Router();
const Bear = require('./bearModel');

router
  .route('/')
  .get((req, res) => {
    Bear.find()
      .then(bears => {
        res.status(200).json( bears );
      })
  })
  .post((req, res) => {
    const { species, latinName } = req.body;
    const newBear = new Bear({ species, latinName });
    newBear.save() //inserts a document into the Bear collection
           .then(savedBear => {
             res.status(201).json(savedBear);
           })
           .catch(err => {
             res.status(422).json({ error: err});
           })
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Bear.findById(id)
      .then(foundBear => {
        res.status(200).json(foundBear)
      })
      .catch(err => {
        res.status(404).json({ error: `No bear with id${id} found.`})
      })
  })
  .delete((req, res) => {
    res.status(200).json({ status: 'please implement DELETE functionality' });
  })
  .put((req, res) => {
    res.status(200).json({ status: 'please implement PUT functionality' });
  });

module.exports = router;
