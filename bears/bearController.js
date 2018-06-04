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
        console.log(req);
        if(!bear){
          res.status(404).json({ error: "The bear with the specified ID does not exist." })
        } else{
          res.status(200).json(bear);
        }
      })
      .catch(err => {
        console.log(req.params.id);
        res.status(500).json({ error: "The bear information could not be retrieved." })
      })
  });
  // .delete((req, res) => {
    
  // })
  // .put((req, res) => {
    
  // });

module.exports = router;
