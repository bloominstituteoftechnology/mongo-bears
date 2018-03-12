const express = require('express');

const Bear = require('./BearModel.js');

const bearsRouter = express.Router();

bearsRouter.post('/', function(req, res) {
	const bearInfo = req.body;
	const bear = new Bear(bearInfo);
	bear.save()
	.then(savedBear => {
		console.log(savedBear);
		res.status(201).json(savedBear);
	}).catch(err => {
		res.send({msg: 'error creating bear', error: err});
	});
});

bearsRouter.get('/', function(req, res) {
	Bear.find({})
	.then(bears => {
		res.json(bears);
	})
	.catch(err => {
		res.json({error: err});
	});
});

bearsRouter.get('/:id', function(req, res) {
	const id = req.params.id;
	Bear.findById(id).then(bear => {
		res.json(bear);
	}).catch(err => {
		res.json({error: err});
	});
});

bearsRouter.delete('/:id', function(req, res) {
	const id = req.params.id;
	Bear.findByIdAndRemove(id).then(bear => {
		res.json(bear);
	}).catch(err => {
		res.json({error: err});
	});
});

module.exports = bearsRouter;
