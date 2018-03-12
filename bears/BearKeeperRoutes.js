const express = require('express');

const BearKeeper = require('./BearKeeperModels.js');

const bearsRouter = express.Router();

//beginning

bearsRouter.post('/api/bears', (req, res) => {
    const bearInfo = req.body;
    const bear = new BearKeeper(bearInfo);
    
    bear
        .save()
        .then(saveBear => {
            restatus(201).json(saveBear);
        })
        .catch(err => {
            res.status(500).json({ message: `error creating bear ${err}`});
        })
});

bearsRouter.get('/api/bears', (req, res) => {
    Bear.find({})
        .then()
        .catch(err => {
            res.status(500).json({ message: `error getting the bears ${err}`});
        });
});

bearsRouter.get();

bearsRouter.delete();

bearsRouter.put();


module.exports = bearsRouter;