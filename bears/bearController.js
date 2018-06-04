const router = require('express').Router();

const Bear = require('./bearModel');

router
  .route('/')
  .get((req, res) => {
    Bear
      .find()
      .then(bears => {
        res.status(200).json(bears);
      })
      .catch(err => res.status(500).json({ error: "The bear information could not be retrieved." }))
  })
  .post((req, res) => {
    const { species, latinName } = req.body;
    const newBear = new Bear({ species, latinName })
    if(!species || !latinName){
      res.status(400).json({ error: "Please provide both species and latinName for the bear." });
      return;
    }
    newBear 
      .save()
      .then(savedBear => {
        res.status(201).json(savedBear);
      })
      .catch(err => {
        res.status(500).json({ error: "There was an error while saving the bear to the database" })
      })
  });

router
  .route('/:id')
  .get((req, res) => {
    Bear
      .findById(req.params.id)
      .then(bear => {
        if(!bear){
          res.status(404).json({ error: "The bear with the specified ID does not exist." })
        } else{
          res.status(200).json(bear);
        }
      })
      .catch(err => {
        res.status(500).json({ error: "The bear information could not be retrieved." })
      })
  })
  .delete((req, res) => {
    Bear
      .findByIdAndRemove(req.params.id)
      .then(bear => {
        if(bear === 0){
          res.status(404).json({ error: "The bear with the specified ID does not exist." })
        } else{
          res.status(200).json({ success: `The bear with the id ${req.params.id} has been deleted from the database.` });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "The bear could not be removed." })
      })
  })
  .put((req, res) => {
    const { species, latinName } = req.body;
    if(!species || !latinName){
      res.status(400).json({ error: "Please provide both species and latinName for the bear." });
      return;
    }
    Bear 
      .findByIdAndUpdate(req.params.id, { species, latinName })
      .then(bear => {
        if(bear === 0){
          res.status(404). json({ error: "The bear with the specified ID does not exist." })
        } else{
          res.status(200).json({ success: `The bear with the id ${req.params.id} has been updated in the database.` })
        }
      })
      .catch(err => {
        res.status(500).json({ error: "The bear information could not be modified." })
      })
  });

module.exports = router;
