const express = require('express');
const mongoose = require('mongoose');


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
    const bear = new Bear(bearInfo);
    bear.validate(err => {
        if(err) res.status(400).send({ errorMessage: Object.values(err.errors)[0].message });
    });
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
    // const bearId = mongoose.Types.ObjectId(req.params.id);
    const bearId = req.params.id;
    Bear.findById(bearId)
        .then(bear => {
            if(bear) res.status(200).send(bear);
            else res.status(404).send({ message: "The Bear with the specified ID does not exist." });
        })
        .catch(err => {
            res.status(400).send({ error: 'The information could not be retrieved.' });
        });
});

bearRouter.delete('/:id', function(req, res) {
    const bearId = req.params.id;
    Bear.findByIdAndRemove(bearId)
        .then(bear => {
            if(bear) res.status(200).send(bear);
            else res.status(404).send({ message: "The Bear with the specified ID does not exist." });
        })
        .catch(err => {
            res.status(500).send({ error: err });
        })
});

bearRouter.put('/:id', function(req, res) {
    const update = req.body;
    const bearId = req.params.id;
    Bear.findByIdAndUpdate(bearId)
        .then(bear => {
            if(bear) res.status(200).send(bear);
            else res.status(404).send({ message: "The Bear with the specified ID does not exist." });
        })
        .catch(err => {
            res.status(200).send({ error: err });
        });
});



module.exports = bearRouter;