const express = require('express');

const BearKeeper = require('./BearKeeperModels.js');

const bearsRouter = express.Router();

bearsRouter.post('/', (req, res) => {
    const bearInfo = req.body;
    const bear = new BearKeeper(bearInfo);
    
    if (!bearInfo.species || !bearInfo.latinName) {
        res.status(400).json({ errorMessage: `Please provide both species and latinName for the Bear.` });
    } 
        bear
        .save()
        .then(savedBear => {
            res.status(201).json(savedBear);
        })
        .catch(err => {
            res.status(500).json({ message: `error creating bear: ${err}`});
        })
});

 bearsRouter.get('/', (req, res) => {
     BearKeeper.find({})
         .then(bears => {
             res.status(200).json(bears);
         })
         .catch(err => {
             res.status(500).json({ message: `error getting the bears: ${err}`});
         });
 });

 bearsRouter.get('/:id', (req, res) => {
     const { id } = req.params;

     BearKeeper.findById(id)
         .then(newBear => { 
             if (!newBear) {
                 res.status(400).json({ message: `bear with the specified id does not exist.`})
             }
             res.status(200).json(newBear);
         })
         .catch(err => {
             res.status(500).json({ message: `error adding the bear: ${err}`});
         })
 });

bearsRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    BearKeeper.findByIdAndRemove(id)

    .then(bear => {
        if (!bear) {
            res.status(404).json({ message: `The Bear with the specified ID does not exist.` });
        }
        res.status(200).json(bear);
    })
    .catch(err => {
        res.status(500).json({ error: `The Bear could not be removed.` });
    });
});

bearsRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const bearInfo = req.body;

    BearKeeper.findByIdAndUpdate(id, bearInfo)
    .then(bear => {
        if (!bear) {
            res.status(404).json({ message: `The Bear with the specified ID does not exist.` });
        }
        res.status(200).json(bear);
    })
    .catch(err => {
        res.status(500).json({ error: "The Bear information could not be modified." })
    });
});


module.exports = bearsRouter;