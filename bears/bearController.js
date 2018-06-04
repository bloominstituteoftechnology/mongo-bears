const router = require('express').Router();

const Bear = require('./bearModel');

router
  .route('/')
  .get((req, res) => {
   Bear.find()
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error fetching da bears' })
    })
  })
  .post((req, res) => {
    const { species, latinName } = req.body;
    const newBear = new Bear({ species, latinName });
    newBear
      .save()
      .then(savedBear => {
        res.status(201).json(savedBear);
      })
      .catch(error => {
        res.status(500).json({ error: 'Your attempt to create a new bear has failed, who do you think you are, God???'})
      });
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Bear.findById(id)
    .then(foundSingleBear => {
      res.status(200).json(foundSingleBear);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error fetching da bear by da ID' })
    })
  })
  .delete((req, res) => {
    const { id } = req.params;
    Bear.findByIdAndRemove(id)
    .then(deleteDaBear => {
      res.status(200).json(deleteDaBear);
    })
    .catch(error => {
      res.status(500).json({ error: 'Couldnt delete the bear for ya, eh' })
    })
  })
  .put((req, res) => {
    const { id } = req.params;
    const { species, latinName } = req.body;
    Bear.findByIdAndUpdate(id, { species, latinName })
    .then(updateDaBear => {
      res.status(200).json(updateDaBear);
    })
    .catch(error => {
      res.status(500).json({ error: 'couldnt do that for ya, da bear is not updated, sorry eh' })
    })
  });

module.exports = router;
