const express = require('express');
const Bears = require('./BearModel.js');
//Bears
const bearRoutes = express.Router();
/* bearRoutes.get('/', function (req,res){
  res.status(200).json({ api: 'running' });
}) */

bearRoutes.get('/', function (req, res) {
  Bears.find({})
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => {
      res.status(500).json({
        Message: 'Could not retrieve Info', error: err,
      });
    });
});

bearRoutes.get('/:id', function (req, res) {
  const { id } = req.params;
  Bears.findById(id, (err, bear) => {
    if (err)
      res.status(500).json({ Message: 'Cannot find bear', error: err })
    res.status(201).json(bear);
  })
})

bearRoutes.post('/', function (req, res) {
  const bearInfo = req.body;

  // if (species && latinName) {
  const bear = new Bears(bearInfo);
  bear
    .save()
    .then(bear => {
      res.status(201)
        .json(bear)
    })
    .catch(error => {
      res
        .status(400)
        .json({
          Message: 'Provide both species and latin name.', error: err,
        });
    })
}
)
//DELETE
bearRoutes.delete('/:id', function (req, res) {
  const { id } = req.params;
  Bears.findByIdAndRemove(id, (err, bear) => {
    if (err)
      res.status(404).json({ Message: 'The bear with the specified ID does not exist', error: err })
    res.status(200).json(bear);
  })
})
// PUT
bearRoutes.put('/:id', function (req, res) {
  const { id } = req.params;
  const update = req.body;

  Bears.findByIdAndUpdate(id, update, { new: true })
    .then(bear => {
      if (!bear) {
        res.status(404).json({ Message: 'The bear with the specified ID does not exist', error: err })
      }
      res.status(201).json(bear);
    })
    .catch(err => {
      res.status(500).json({ Message: 'The bear with the specified ID does not exist', error: err })

    });
});

module.exports = bearRoutes;