const router = require('express').Router();
const Bear = require('./bearModel');


router
  .route('/')
  .get((req, res) => {
    Bear.find()
      .then(bears => {
        res.status(200).json( bears );
      })
  })
  .post((req, res) => {
    const { species, latinName } = req.body;
    const newBear = new Bear({ species, latinName });
    if (!species || !latinName) {
      res.status(400).json({ error: "Please provide both species and latinName for the bear." });
      return;
    };
    newBear.save() //inserts a document into the Bear collection
           .then(savedBear => {
             res.status(201).json(savedBear);
           })
           .catch(err => {
             res.status(500).json({ error: err});
           })
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Bear.findById(id)
      .then(foundBear => {
        res.status(200).json(foundBear)
      })
      .catch(err => {
        res.status(404).json({ error: `No bear with id${id} found.`})
      })
  })
  .delete((req, res) => {
    const { id } = req.params;
    Bear.findByIdAndRemove(id)
        .then(bear => {
          res.json(bear)
        })
        .catch(err => {
          res.status(404).json({ error: `No bear with id${id} found.Can't delete it!` })
        })
  })
  .put((req, res) => {
    const { id } = req.params;    
    const { species, latinName} = req.body;
    if (!species || !latinName) {
      sendError(400, "Must provide species and latinName", res);
      return;
    }
    Bear.findByIdAndUpdate(id, req.body)
        .then(updatedBear => {
          res.json(req.body);
        })
        .catch(err => {
          res
            .status(404)
            .json({ error: `No bear with id${id} found. Can't update it!` })
        })
  });

module.exports = router;
