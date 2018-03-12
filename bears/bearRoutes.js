const express = require('express');

const Bear = require('./bearModel.js');

const bearRouter = express.Router();

bearRouter.get('/', function(req, res) {
    Bear.find({})
        .then(bears => {
            res.status(200).send(bears);
        })
        .catch(err => {
            res.status(500).send({ error: err });
        })
});

bearRouter.post('/', function(req, res) {
    const bearInfo = req.body;
    console.log(req.body);

    const bear = new Bear(bearInfo);

    console.log(bear);

    bear
        .save()
        .then(bear => {
            res.status(201).send(bear);
        })
        .catch(err => {
            res.status(400).send({ error: err });
        });
});

bearRouter.get('/:id', function(req, res) {
    Bear.findById(req.params.id)
        .then(bear => {
            res.status(200).send(bear);
        })
        .catch(err => {
            res.status(400).send({ error: err });
        });
});

module.exports = bearRouter;