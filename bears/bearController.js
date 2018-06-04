const router = require('express').Router();

const Bear = require('./bearModel')

router
  .route('/')
  .get((req, res) => {
    Bear.find()
      .then(bears => {
        res.status(200).json({ bears });
      })
      .catch(err => res.status(500).json({ error: 'Error fetching bears' }))

  })
  .post((req, res) => {
    const { species, latinName } = req.body;
    const newBear = new Bear({ species, latinName })
    newBear.save()
      .then(savedBear => {
        console.log(savedBear)
        res.status(201).json(savedBear)
      })
      .catch(err => {
        console.log(err)
      })
  });

router
  .route('/:id')
  .get((req, res) => {
    let { id } = req.params
    Bear.findById(id)
      .then(bear => {
        res.status(200).json({ bear })
      })
      .catch(err => res.status(404).json({ err }))
  })
  .delete((req, res) => {
    let { id } = req.params
    Bear.findByIdAndRemove(id)
      .then(bear => {
        res.status(200).json({ bear })
      })
      .catch(err => res.status(404).json({ err }))
  })
  .put((req, res) => {
    let { id } = req.params
    const { species, latinName } = req.body;
    const changedBear = new Bear({ species, latinName });
    Bear.findByIdAndUpdate(id, { species, latinName })
      .then(bear => {
        res.status(200).json({ bear })
      })
      .catch(err => res.status(404).json({ err }))
  });

module.exports = router;
