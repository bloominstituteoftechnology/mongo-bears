const router = require('express').Router();
const Bear = require("./bearModel");

let errorMessage = (statusCode, message, res) => {
  res.status(statusCode).json({err: message})
};

router
  .route('/')
  .get((req, res) => {
    Bear.find()
      .then(bears => {
        res.status(200).json(bears);
      })
      .catch(err => {
        errorMessage(500, "Error fetching bears", res);
      })
  })
  .post((req, res) => {
    const { species, latinName } = req.body;
    const newBear = new Bear({species, latinName});
    newBear.save()
      .then(savedBear => {
        res.status(201).json(savedBear);
      })
      .catch(err => {
        res.status(422).json({error: err});
      });
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
