const router = require('express').Router();

const Bear = require('./bearModel')

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
  const {id} = req.params
  console.log(id)
  Bear.findById(id)
  .then(bears => {
    res.status(200).json(bears);
  })
  .catch(error => {
    res.status(500).json(error);
  })
})
.delete((req, res) => {
  const {id} = req.params
  Bear.findByIdAndRemove(id)
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
  Bear.findByIdAndUpdate(id, { species, latinname })
  .then(bears => {
    res.status(200).json(bears);
  })
  .catch(error => {
    res.status(500).json(error);
  })
});

module.exports = router;
