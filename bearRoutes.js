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

bearRoutes.get('/:id', function (req, res){
  const { id } = req.params;
  
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


/* bearRoutes.put('/api/bears/:id', function (req, res) {

  const bear = new Bear(update);
  bear
    .save()
    .then()
}) */

module.exports = bearRoutes;