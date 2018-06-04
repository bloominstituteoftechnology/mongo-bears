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
      Bear
        .create(req.body)
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
    Bear
      .findById(req.params.id)
      .then(response => {
        res.status(200).json({ data: response });
      })
      .catch(error => {
        res.status(500).json("FAILURE")
      })
  })
  .delete((req, res) => {
    Bear
      .findByIdAndDelete(req.params.id)
      .then(response => {
        res.status(200).json({ status: 'DELETED' });
      })
      .catch(error => {
        res.status(500).json("FAILURE")
      })
  })
  .put((req, res) => {
    Bear
      .findByIdAndUpdate(req.params.id, req.body)
      .then(response => {
        res.status(200).json("success");
      })
      .catch(error => {
        res.status(500).json("FAILURE")
      })
  });

module.exports = router;
