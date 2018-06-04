const router = require('express').Router();
const Bear = require('./bearModel.js');

router
  .route('/')
  .get((req, res) => {
    Bear
      .find()
      .then(response => {
        return console.log(response);
      })
      .catch(error => {
        res.status(500).json({
          error: "error"
        });
      })
    res.status(200).json({ route: '/api/bears/' });
  })
  .post((req, res) => {
    let newBear = req.body;
    let request = new Bear(newBear);
    request
      .save()
      .then(response => {
        res.status(201).json('The Post was Successful')
      })
      .catch(error => {
        res.status(500).json("There was an error");
      })
    res.status(201).json({ status: 'please implement POST functionality' });
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
