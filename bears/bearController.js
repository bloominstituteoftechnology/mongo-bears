const router = require('express').Router();

const Bear = require('./bearModel');

router
  .route('/')
  .get((req, res) => {
    Bear.find()
      .then(bears => {
        res.status(200).json(bears);
      }).catch(err => res.status(500).json({ error: 'Error fetching bears' }));
  })
  .post((req, res) => {
    const { species, latinName } = req.body;
    const newBear = new Bear({ species, latinName });
    newBear.save()
      .then(savedBear => {
        res.status(201).json(savedBear);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      })
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Bear.findById(id)
      .then(foundbear => {
        res.status(200).json({ foundbear });
      })
      .catch(err => {
        res.status(404).json({ error: "does not exist" })
      })

  })
  .delete((req, res) => {
    const { id } = req.params;
    Bear.findByIdAndRemove(id)
      .then(bearDelete => {
        if (bearDelete === null) {
          res.status(404).json({ error: "the bear with this id does not exist" })
          return;
        }
        res.json({ sucess: 'Bear removed', resource: bearDelete });
      })
      .catch(err => {
        res.status(500).json({ error: 'The bear cannot be removed' })
      })
  })
  .put((req, res) => {
    const { id } = req.params;
    const updates = ({ species, latinName } = req.body);
    if (!species || !latinName) {
      res.status(404).json({ error: 'The bear with the specified ID does not exist.' })
      return;
    }
    Bear.findByIdAndUpdate(id, updates, { new: true }) 
      .then(bearUpdated => {
        if (bearUpdated === null) {
          res.status(404).json({ error: 'No bear by that ID found in database.' });
          return;
        }
        res.json({ success: 'Updated the bear.', resource: bearUpdated });
      })
      .catch(err =>
        res.status(500).json({ error: error.message }));
  });
module.exports = router;
