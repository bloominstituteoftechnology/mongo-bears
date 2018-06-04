const router = require('express').Router();
const Bear = require('./bearModel');


router
  .route('/')
  .get((req, res) => {
    Bear.find()
      .then(bears => {
        res.status(200).json(bears);
      })
      .catch(err => {
        res
          .status(500)
          .json({
            error: "The bear information could not be retrieved."
          });
      });
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
             res
               .status(500)
               .json({
                 error:
                   "There was an error while saving the bear to the database"
               });
           })
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Bear.findById(id)
      .then(foundBear => {
        console.log(foundBear)
        if (foundBear === null) {
          res
              .status(404)
              .json({
                error: `No bear with id${id} found. Can't retrieve it!`
              });
              return;
        }
        res.json(foundBear)
      })
      .catch(err => {

        res.status(500).json({error: "The bear information could not be retrieved."});
      })
  })
  .delete((req, res) => {
    const { id } = req.params;
    Bear.findByIdAndRemove(id)
        .then(bear => {
          if (bear === null) {
            res
              .status(404)
              .json({
                error: `No bear with id${id} found. Can't retrieve it!`
              });
            return;
          }
          res.json({ removedBear: bear})
        })
        .catch(err => {
          res.status(404).json({ error: `No bear with id${id} found. Can't delete it!` })
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
          if (updatedBear === null) {
            res
              .status(404)
              .json({
                error: `No bear with id${id} found. Can't update it!`
              });
            return;
          }
          res.json({updatedBear: updatedBear});
        })
        .catch(err => {
          res
            .status(404)
            .json({ error: `No bear with id${id} found. Can't update it!` })
        })
  });

module.exports = router;
