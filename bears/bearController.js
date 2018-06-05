const router = require('express').Router(); // declare that all routes for this address will be found on this router

const Bear = require('./bearModel'); // pull in our Bear model

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
    const { species, latinName } = req.body;
    const newBear = new Bear({ species, latinName });
    newBear
      .save() // this will `insert` a document into the Bear collection
      .then(savedBear => {
        res.status(201).json(savedBear);
      })
      .catch(err => {
        res.status(422).json({ error: err });
      });
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Bear.findById(id) // find a specific resource in a collection by ID
      .then(foundBear => {
        console.log(foundBear);
        if (foundBear === null) {
          res.status(404).json({ error: 'No bear by that id in DB' });
          return;
        }
        res.status(200).json(foundBear);
      })
      .catch(err => {
        res.status(404).json({ error: 'No bear by that id in DB' });
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
          res.status(404).json({ error: 'No bear by that Id in the DB' });
          return;
        }
        res.json({ success: `Bear Removed`, resource: removedBear });
      })
      .catch(err => res.status(500).json({ error: err }));
  })
  .put((req, res) => {
    const { id } = req.params;
    const updates = ({ species, latinName } = req.body);
    Bear.findByIdAndUpdate(id, updates, { new: true }) // new: true will give you the updated resource, not the previous one
      .then(bearUpdated => {
        if (bearUpdated === null) {
          // IF there is no bear by that id, then mongo won't throw an error, rather give us back a null object
          // MAKE SURE you handle this null object!!!
          res.status(404).json({ error: 'No bear by that Id in the DB' });
          return;
        }
        res.json({ success: 'Updated da bear', resource: bearUpdated });
      })
      .catch(err => res.status(500).json({ error: err }));
    // findByIdAndUpdate
  });

module.exports = router;
