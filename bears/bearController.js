const router = require('express').Router();

const Bear = require('./bearSchema');

router
  .route('/')
  .get((req, res) => {
    Bear.find()
      .then(bears => {
        res.status(202).json({ route: '/api/bears/' + req.params });
      })
      .catch(error => {
        res.status(500).json({ error: 'No Bears at this Location' });
      })
      .post((req, res) => {
        const { species, latinName } = req.body;
        const newBear = new Bear({ species, latinName });
        newBear
          .save()
          .then(savedBear => {
            res.status(201).json(savedBear);
          })
          .catch(error => {
            res.status(422).json({ error: err });
          });
      });

  });

router
  .route('/:id')
  .get((req, res) => {
    res.status(200).json({ route: '/api/bears/' + req.params.id });
  })
  .delete((req, res) => {
    Bear.findById(id).then(bears => {
      remove(id).then(response =>
        res.status(404).json({ status: 'The bear with the specified ID does not exist.' }));
    });
  });

  .put((req, res) => {
  const { id } = req.params;
  const { species, latinName } = req.body;
  if (!species || !latinName) {
    sendUserError(404, 'The bear information could not be modified.', res);
    return;
  }
  Bear
    .update(id, { species, latinName })
    .then(response => {
      if (response === 0) {
        sendUserError(500, 'The bear with the specified ID does not exist.', res);
        return;
      }
      Bear
        .findById(id)
        .then(foundBear => {
          bear = { ...foundBear[0] };

          db.remove(id).then(response => {
            res.status(200).json(bear);
          });
        });
    })
    .catch(error => {
      sendUserError(500, 'The bear information could not be modified.', res);
      return;
    });
});



function get(req, res) {
  res.status(200).json({ route: '/api/bears/' });
}

function post(req, res) {
  const bearData = req.body;
  const bear = new Bear(bearData);

  bear
    .save() //returns a promise
    .then(bear => {
      res.status(201).json(bear);
    })
    .cath(error => {
      res.status(500).json(error);
    });
}

module.exports = router;
