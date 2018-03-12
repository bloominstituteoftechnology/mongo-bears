const express = require('express');

const Bear = require('./bearModel.js');

const bearRouter = express.Router();

bearRouter.get('/', function(req, res) {
    Bear.find({})
        .then(bears => {
            res.status(200).send(bears);
        })
        .catch(err => {
            res.status(400).send({ error: "The information could not be retrieved." });
        });
});

bearRouter.post('/', function(req, res) {
    const bearInfo = req.body;
    console.log(req.body);

    const bear = new Bear(bearInfo).validate(err => {
        res.status(400).send({ errorMessage: Object.values(err.errors)[0].message });
    });

    console.log(bear);

    bear
        .save()
        .then(bear => {
            res.status(201).send(bear);
        })
        .catch(err => {
            res.status(400).send({ error: "There was an error while saving the Bear to the Database" });
        });
});

bearRouter.get('/:id', function(req, res) {
    Bear.findById(req.params.id)
        .then(bear => {
            res.status(200).send(bear);
        })
        .catch(err => {
            res.status(400).send({ error: 'The information could not be retrieved.' });
        });
});

bearRouter.delete('/:id', function(req, res) {
    Bear.findByIdAndRemove(req.params.id)
        .then(bear => {
            res.status(200).send(bear);
        })
        .catch(err => {
            res.status(500).send({ error: err });
        })
});

bearRouter.put('/:id', function(req, res) {
    const update = req.body;
    Bear.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(bears => {
            res.status(200).send(bears);
        })
        .catch(err => {
            res.status(200).send({ error: err });
        });
});



module.exports = bearRouter;