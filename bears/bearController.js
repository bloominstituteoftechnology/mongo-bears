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
        res.status(201).json(savedBear);
      })
      .catch(error => {
        res.status(422).json({ error }) 
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
