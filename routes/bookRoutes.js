const express = require('express');

const routes = (Bear) => {
  const bearRouter = express.Router();

  bearRouter.route('/bears')
    .get((req, res) => {
      Bear.find({})
      .then(bears => {
        res.status(200).json(bears);
      })
      .catch(err => {
        res.status(500).json({ error: 'The information could not be retrieved.' });
      })
    })
    .post((req, res) => {
      const bear = new Bear(req.body);
      bear.save().then(savedBear => {
        res.status(201).json(savedBear);
      }).catch(err => {
        res.status(500).json({ error: 'Error creating bear' });
      });
    });
  bearRouter.use('/bears/:id', (req, res, next) => {
    Bear.findById(req.params.id)
      .then(bear => {
        if (bear) {
          req.bear = bear;
          next();
        } else {
          res.status(404).json({ message: 'The Bear with the specified ID does not exist.' });
        }
      })
      .catch(err => {
        res.status(500).json({ error: 'The information could not be retrieved.' });
      });
  });

  bearRouter.route('/bears/:id')
    .get((req, res) => {
      res.json(req.bear);
    })
    .put((req, res) => {
      Bear.findById(req.params.id)
        .then(bear => {
          bear.species = req.body.species;
          bear.latinName = req.body.latinName
          bear.save(savedBear => {
            res.status(201).json(savedBear);
          });
        })
        .catch(err => {
          res.status(500).json({ error: 'The information could not be retrieved.' });
        })
    })
    .delete((req, res) => {
      Bear.findById(req.params.id)
        .then(bear => {
          bear.remove()
            .then(() => {
              res.status(204).json('Removed');
            })
            .catch(err => {
              res.status(500).json({ error: 'The Bear could not be removed' });
            });
        })
        .catch(err => {
          res.status(500).json({ error: 'The Bear could not be removed' });
        });
    });
    return bearRouter;
};

module.exports = routes;
