const express = require('express');

const Bear = require('./BearModel.js');

const bearRouter = express.Router();

bearRouter.post('/', (req, res) => {
  const { species, latinName, createdOn } = req.body;
  if (!species || !latinName) {
    res.status(400).json({ errorMessage: "Please provide both species and latinName for the Bear."});
    return;
  }
  const bear = new Bear({ species, latinName, createdOn });
  bear.save()
  .then(savedBear => {
    res.status(201).json(savedBear);
  })
  .catch(err => {
    res.status(500).json({ errorMessage: "There was an error while saving the Bear to the Database"})
  })
})

bearRouter.get('/', (req, res) => {
  Bear.find({})
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => {
      res.statu(500).json({ error: "The information could not be retrieved."})
    })
})

bearRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  Bear.count({_id: id}, (err, count)=> {
    if (!count > 0){
      res.status(404).json({ message: "The Bear with the specified ID does not exist." })
    }
  })
  Bear.findById(id, (err, bear) => {
    if (err) {
      res.status(500).json({ message: "The information could not be retreived."})
    }
    res.json(bear);
  })
})

bearRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  Bear.count({_id: id}, (err, count)=> {
    if (!count > 0){
      res.status(404).json({ message: "The Bear with the specified ID does not exist." })
    }
  })
  Bear.findByIdAndRemove(id, (err) => {
    if (err) {
      res.status(500).json({ error: "The Bear could not be removed" })
    }
    res.json({ success: "Successfully removed bear"});
  })
})

bearRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  Bear.count({_id: id}, (err, count)=> {
    if (!count > 0){
      res.status(404).json({ message: "The Bear with the specified ID does not exist." })
    }
  })
  Bear.findByIdAndUpdate(id, {$set: req.body}, (err, bear) => {
    if (err) {
      res.status(500).json({ error: "The Bear information could not be modified" })
    }
    res.json({ success: "The Bear information was successfully modified"});
  })
})

module.exports = bearRouter;
