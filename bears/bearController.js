const router = require('express').Router();
const Bear = require('./bearModel.js');

router
  .route('/')
  .get((req, res) => {
    Bear
      .find()
      .then(response => {
        res.status(200).json({ data: response });
      })
      .catch(error => {
        res.status(500).json({ error: "error" })
      })
  })
  .post((req, res) => {
    let newBear = req.body
    let request = new Bear(newBear)
    request
      .save()
      .then(response => {
        res.status(201).json("Successful Post")
      })
      .catch(error => {
        res.status(500).json("FAILURE")
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
