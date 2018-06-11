const router = require('express').Router();  // declare that all routes for this address will be found on this router

const Bear = require('./bearModel');  // pull in our Bear model

router
  .route('/')
  .get((req, res) => {
    Bear.find()  // This will find ALL resources at that model.
      .then(bears => {
        res.status(200).json(bears);
      })
      .catch(err => res.status(500).json({ error: 'The bear cannnot be found.' }));
  })
  .post((req, res) => {
    const { species, latinName } = req.body;
    const newBear = new Bear ({ species, latinName });
    if (!species || !latinName) {
      res.status(400).json({ error: 'Please provide species and latinName.' });
      return;
    }
    newBear
      .save()   // this will `insert` a document into the Bear collection
      .then(savedBear => {
        console.log(savedBear);
          res.status(201).json({ status: 'Successfully added!' });    
      })
      .catch(err => {
        res.status(500).json({ error: error.message });
      });
});

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Bear.findById(id)   // find a specific resource in a collection by ID
      .then(foundBear => {
        console.log(foundBear);
        if(foundBear === null) {
          res.status(404).json({ error: 'No bear by that id in the databse.'});
          return;
        }
        res.status(200).json({ success: 'Bear found.' });
      })
      .catch(err => {
        res.status(404).json({ error: 'The bear with the specified ID does not exist.'});
      });
    })
    .delete((req, res) => {
      const { id } = req.params;
    Bear.findByIdAndRemove(id)
      .then(removedBear => {
        console.log(removedBear); 
        if (removedBear === null) {
          // IF there is no bear by that id, then mongo won't throw an error, rather give us back a null object
          // MAKE SURE you handle this null object!!!
          res.status(404).json({ error: 'The bear with the specified ID does not exist.' });
          return;
        }
        res.json({ success: `Bear removed.`, resource: removedBear });
      })
      .catch(err => 
        res.status(500).json({ error: 'The bear could not be removed.' })
      );
  })  
    .put((req, res) => {
      const { id } = req.params;
      const updates = ({ species, latinName } = req.body);      
      if (!species || !latinName) {
        res.status(404).json({ error: 'The bear with the specified ID does not exist.' })
        return;
      }
      Bear.findByIdAndUpdate(id, updates, { new: true})  // new: true will give you the updated resource, not the previous one
        .then(bearUpdated => {
          if (bearUpdated === null) {
            // IF there is no bear by that id, then mongo won't throw an error, rather give us back a null object
            // MAKE SURE you handle this null object!!!
            res.status(404).json({ error: 'No bear by that ID found in database.' }); 
            return; 
          }
          res.json({ success: 'Updated the bear.', resource: bearUpdated });
      })
          .catch(err => 
            res.status(500).json({ error: error.message }));
});

module.exports = router;