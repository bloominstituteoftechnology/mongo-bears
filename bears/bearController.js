const router = require('express').Router();
const Bear = require('./bearModel');

router
  .route('/')
  .get((req, res) => {
    Bear.find()
      .then(bears => {
        res.json({ bears });
      })
      .catch(error => res.status(500).json({ error: 'Error fetching bears' }));
  })
  .post((req, res) => {
    const { species, latinName } = req.body;
    const postBear = new Bear({ species, latinName });
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
        res.json({ bear });
      })
      .catch(error => res.status(500).json({ error: 'Error fetching bear' }));
  })
  .delete((req, res) => {
    res.status(200).json({ status: 'please implement DELETE functionality' });
  })
  .put((req, res) => {
    res.status(200).json({ status: 'please implement PUT functionality' });
  });

module.exports = router;
