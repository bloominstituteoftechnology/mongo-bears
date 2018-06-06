const router = require('express').Router();

const Bear = require('./bearSchema');


router.route('/').get((req, res) => {
  Bear.find()
    .then(bears => {
      res.status(200).json({ route: '/api/bears/' + req.params });
    })
    .catch(error => {
      res.status(500).json({ error: 'The bear information could not be retrieved.' });
    })

  router.route('/').post((req, res) => {
    const { species, latinName } = req.body;
    const newBear = new Bear({ species, latinName });
    newBear
      .save()
      .then(savedBear => {
        res.status(201).json(savedBear);
      })
      .catch(error => {
        res.status(400).json({ status: "Please provide both species and latinName for the bear." });
      });
  });

});



router.route('/:id').get((req, res) => {
  const { id } = req.params;
  Bear.findByIdAndRemove(id)
    .then(bears => {
      res.status(404).json({ status: '"The bear with the specified ID does not exist' });
    })
    .catch(err => res.status(500).json(err));
});

router.route('/:id').delete((req, res) => {
  const { id } = req.params;

  Bear.findByIdAndRemove(id)
    .then(bears => {
      res.status(404).json({ status: 'The bear with the specified ID does not exist.' });
    })
    .catch(err => res.status(500).json(err));
});

router.route('/:id').put((req, res) => {
  const { id } = req.params;
  const { species, latinName } = req.bpdy;

  Bear.findbyIdAndUpdate(id, update, options).then(bear => {
    if (bear) {
      res.status(200).json(bear);
    } else {
      res.status(404).json({ status: '"The bear with the specified ID does not exist' });
    }
  })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
