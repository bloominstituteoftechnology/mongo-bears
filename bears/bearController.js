const router = require('express').Router();

const bear = require('./bearModel');

router
  .route('/')
  .get((req, res) => {
    bear.find()
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(error => {
      res.status(500).json(error);
    })
  })

  .post((req, res) => {
    const { species, latinname } = req.body;
    const newBear = new bear({ species, latinname });
    newBear.save()
    .then(bears => {
      res.status(201).json(bears);
    })
    .catch(error => {
      res.status(500).json(error);
    })
  });



router
  .route('/:id')
  .get((req, res) => {
    const {id} = req.params
    console.log(id)
    bear.findById(id)
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(error => {
      res.status(500).json(error);
    })
  })
  .delete((req, res) => {
    const {id} = req.params
    bear.findByIdAndRemove(id)
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(error => {
      res.status(500).json(error);
    })
  })
  .put((req, res) => {
    const {id} = req.params
    const { species, latinname } = req.body;
    bear.findByIdAndUpdate(id, { species, latinname })
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(error => {
      res.status(500).json(error);
    })
  });

module.exports = router;
