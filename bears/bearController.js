const router = require('express').Router();

const Bear = require('./bearSchema');

router
  .route('/')
  .get(get)
  .post(post);

router
  .route('/:id')
  .get((req, res) => {
    res.status(200).json({ route: '/api/bears/' + req.params.id });
  })
  .delete((req, res) => {
    res.status(200).json({ status: 'please implement DELETE functionality' });
  })
  .put((req, res) => {
    Bear.find().then(bears => {
      res.status(200).json({ status: 'please implement PUT functionality' });
    })
      .cath(error => {
        res.status(500).json(error);
      });
  })  

function get(req, res) {
  res.status(200).json({ route: '/api/bears/' });
}

function post(req, res) {
  const bearData = req.body;
  const bear = new Bear(bearData);

  bear
    .save() //returns a promise
    .then(bear => {
      res.status(201).json(bear);
    })
    .cath(error => {
      res.status(500).json(error);
    });
}

module.exports = router;
