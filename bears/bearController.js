const bears = require('express').Router();
const Bear = require('./bearModel');

bears
  .route('/')
  .get((req, res) => {
    Bear.find()
      .then(bears => {
        res.status(200).json(bears);
      })
      .catch(error => {
        res.json(500).json({ error: 'The bear information could not be retrieved.'});
      });
  })
  .post((req, res) => {
    res.status(201).json({ status: 'please implement POST functionality' });
  });

bears
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Bear.findById(id)
      .then(bear => {
        res.status(200).json(bear);
      })
      .catch(error => {
        res.status(404).json({ error: 'The bear with the specified ID does not exist.' });
      });
  })
  .delete((req, res) => {
    res.status(200).json({ status: 'please implement DELETE functionality' });
  })
  .put((req, res) => {
    res.status(200).json({ status: 'please implement PUT functionality' });
  });

module.exports = bears;
