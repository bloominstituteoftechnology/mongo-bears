const router = require('express').Router();

const Bear = require('./bearModel');

router
  .route('/')
  .get((req, res) => {
    Bear.find() // This will find ALL resources at that model.
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => res.status(500).json({ error: 'Error fetching bears' }));
  })
  .post((req, res) => {
   const {species, latinName} = req.body;
   const newBear = new Bear({species, latinName});
    newBear.save().then(savedBear => {
      res.status(201).json(savedBear)
    })
    .catch(err => {
      res.status(422).json({error: err})
   })
  });

router
  .route('/:id')
  .get((req, res) => {
   const {id} = req.params;
   Bear.findById(id).then(foundBear => {
     res.status(200).json(foundBear)
   })
   .catch(err => {
     res.staus(404).json({error: "No bear with that ID in DB"})
   });
  })
  .delete((req, res) => {
    const {id} = req.params;
    Bear.findOneAndRemove(id).then(removeBear => {
      res.status(200).json(removeBear)
    })
  })
  .put((req, res) => {
    const {id} = req.params;
    const {body} = req.body;
   Bear.findByIdAndUpdat(id,{
     $set: {
       species: body,
       latinName: body
     }
   }).then((result) => {
     console.log(result)
   })
  });

module.exports = router;
