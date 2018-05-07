const router = require('express').Router();

const Bear = require('./bearModel');

router
  .route('/')
  .get(get)
  .post(post);

router
  .route('/:id')
  .get(getById)
  .delete(destroy)
  .put(put);

function get(req, res) {
  Bear.find().then(bears => {
    res.status(200).json(bears);
  });
}

function post(req, res) {
  const bearData = req.body;

  const bear = new Bear(bearData);

  bear
    .save()
    .then(bear => {
      res.status(201).json(bear);
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

function getById(req, res) {
  const { id } = req.params;

  Bear.findById()
    .then(bear => {
      res.status(200).json(bear);
    });
}

function put(req, res) {
  const { id } = req.params;
  const newInfo = req.body;
  
  Bear.findyByIdAndUpdate(id, newInfo)
    .then(response => {
      Bear.find().then( bears => {
        res.status(200).json(bears);
      });
    })
}

function destroy(req, res) {
  const { id } = req.params;
  
  Bear.findyByIdAndRemove(id)
    .then(response => {
      Bear.find().then( bears => {
        res.status(200).json(bears);
      });
    })
}

module.exports = router;
