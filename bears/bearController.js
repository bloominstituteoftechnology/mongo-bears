const router = require('express').Router();
const Bear = require('./bearModel.js');

router
  .route('/')
  .get((req, res) => {
    Bear
      .find()
      .then(response => {
        res.status(200).json({
          data: response
        })
      })
      .catch(error => {
        res.status(500).json({
          error: "error"
        });
      })
    // .status(200).json({ route: '/api/bears/' });
  })
  .post((req, res) => {
    
    Bear.create(req.body)
      .then(response => {
        res.status(201).json('The Post was Successful')
      })
      .catch(error => {
        res.status(500).json("There was an error");
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
