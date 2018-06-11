const router = require('express').Router();
const Bear = require('./bearModel');

router
  .route('/')
  .get((req, res) => {
    Bear
      .find()
      .then(bears => {
        res.status(200).json({ bears })
      })
      .catch(error => {
        res.status(500).json({ error })
      })
      
  })

  .post((req, res) => {
    const { species, latinName } = req.body;
    const newBear = new Bear({ species, latinName })
    newBear
      .save()
      .then(sevedBear => {
        console.log(savedBear);
        res.status(201).json({ savedBear });
      })
      .catch(error => {
        res.status(422).json({ error }) 
      })
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Bear
      .findById(id)
      .then(foundBear => {      
        res.status(200).json(foundBear);
      })
      .catch(error => {
        res.status(404).json({ error })
      });
  })

  .delete((req, res) => {
    const { id } = req.params;
    Bear
      .findByIdAndRemove(id)
      .then(deletedBear => {
        res.status({ deletedBear });
      })
      .catch(error => {
        res.status(500).json({ error })
      });
  })

  .put((req, res) => {
    const { id } = req.params;
    const { species, latinName } = req.body;
    Bear
      .findByIdAndUpdate(id, { species, latinName })
      .then(updatedBear => {
        res.status(202).json({ updatedBear });
      })
      .catch(error => {
        res.status.json({ error });
      })
  });

module.exports = router;
