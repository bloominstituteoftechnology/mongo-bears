const router = require('express').Router();

const Bear = require('./bearModel');

router
  .route('/api/bears')
  .get((req, res) => {
    Bear
      .find()
      .then(bears => {
        res.status(200).json(bears);
      })
      .catch(err => res.status(500).json({ error: "The bear information could not be retrieved." }))
  })
  .post((req, res) => {
    const { species, latinName } = req.body;
    const newBear = new Bear({ species, latinName })
    if(!species || !latinName){
      res.status(400).json({ error: "Please provide both species and latinName for the bear." });
      return;
    }
    newBear 
      .save()
      .then(savedBear => {
        res.status(201).json(seavedBear);
      })
      .catch(err => {
        res.status(500).json({ error: "There was an error while saving the bear to the database" })
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
