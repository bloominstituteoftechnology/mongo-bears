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
    .catch(err => res.status(500).json({error: "There was an error fetching the data."}));
  })
  .post((req, res) => {
    const {species, latinName} = req.body;
    const newBear = new Bear ({species, latinName});
    if (!species || !latinName){
      res.status(400).json({error: "Please provide both species and latinName."})
    }
    newBear
    .save()
    .then(savedBear => {
      res.status(201).json(savedBear);
    })
    .catch(err => {
      res.status(500).json({error: "There was an error while saving to the db."})
    });
    // res.status(201).json({ status: 'please implement POST functionality' });
  });

router
  .route('/:id')
  .get((req, res) => {
    // res.status(200).json({ route: '/api/bears/' + req.params.id });
    const {id} = req.params;
    if(id.length !== 24){
      res.status(400).json({error: "IDs need to be 24 characters long."})
    }
    Bear.findById(id)
    .then(bear => {
      if(bear === null){
        res.status(404).json({error: "Bear cannot be found with given ID."});
        return;
      } else {
        console.log(bear.id.length);
        res.status(200).json(bear);
      }
    })
    .catch(err => {
      res.status(500).json({error: 'Something has gone wrong, please try again.'});
    })
  })
  .delete((req, res) => {
    // res.status(200).json({ status: 'please implement DELETE functionality' });
    const {id} = req.params;
    console.log(id);
    if (id.length !== 24){
      res.status(400).send({error: "Your ID needs to be 24 characters long."})
      return;
    }
    Bear.findByIdAndRemove(id)
    .then(response => {res.status(200).json(response)})
    .catch(err => {res.status(500).json({error: "Something has gone wrong, please try again."})});
  })
  .put((req, res) => {
    // res.status(200).json({ status: 'please implement PUT functionality' });
    const {id} = req.params;
    console.log(id);
    const {species, latinName} = req.body;
    const bear = {species, latinName};
    console.log(id);
    console.log(bear);
    if(id.length !== 24){
      res.status(400).json({error: "The ID entered is not 24 characters."})
    } else {
      Bear.findByIdAndUpdate(id, bear)
      .then(bear => {res.status(200).json(bear)})
      .catch(err => {res.status(404).json({error: 'No bear bearing that ID in the database!'})})
    }
  });

module.exports = router;
