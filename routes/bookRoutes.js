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
        res.status(500).json({ err: 'Error creating bear' });
      })
    })
    .post((req, res) => {
      const bear = new Bear(req.body);
      bear.save().then(savedBear => {
        res.status(201).json(savedBear);
      }).catch(err => {
        res.status(500).json({ err: 'Error creating bear' });
      });
    });

  bearRouter.route('/bears/:id')
    .get((req, res) => {
      Bear.findById(req.params.id)
        .then(id => {
          res.status(200).json(id);
        })
        .catch(err => {
          res.status(500).json('Error finding bear');
        });
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
          res.status(500).json('Error finding bear');
        })
    });
    return bearRouter;
};

module.exports = routes;
