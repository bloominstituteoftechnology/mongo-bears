const express = require('express');
const Bear = require('./BearModel.js');
const bearsRouter = express.Router();

bearsRouter.post('/', function(req, res) {
	if(!req.body.species || !req.body.latinName){
		res.status(400).json({ errorMessage: "Please provide both species and latinName for the Bear." });
	}
	const bearInfo = req.body;
	const bear = new Bear(bearInfo);
	bear.save()
	.then(savedBear => {
		console.log(savedBear);
		res.status(201).json(savedBear);
	}).catch(err => {
		res.status(500).json({ error: "There was an error while saving the Bear to the Database" });
	});
});

bearsRouter.get('/', function(req, res) {
	Bear.find({})
	.then(bears => {
		res.json(bears);
	})
	.catch(err => {
		res.status(500).json({ error: "The information could not be retrieved." });
	});
});

bearsRouter.get('/:id', function(req, res) {
	const id = req.params.id;
	Bear.findById(id).then(bear => {
		res.json(bear);
	}).catch(err => {
		if(err.reason === undefined){
			res.status(404).json({ message: "The Bear with the specified ID does not exist." });
		}
		res.status(500).json({ error: "The information could not be retrieved." });
	});
});

bearsRouter.delete('/:id', function(req, res) {
	const id = req.params.id;
	Bear.findByIdAndRemove(id).then(bear => {
		res.json(bear);
	}).catch(err => {
		if(err.reason === undefined){
			res.status(404).json({ message: "The Bear with the specified ID does not exist." });
		}
		res.status(500).json({ error: "The Bear could not be removed" });
	});
});

bearsRouter.put('/:id', function(req, res) {
	const id = req.params.id;
	const bear = req.body;
	Bear.findByIdAndUpdate(id, bear, {new: true}).then(bear => {
		console.log(bear);
		res.json(bear);
	}).catch(err => {
		if(err.reason === undefined){
			res.status(404).json({ message: "The Bear with the specified ID does not exist." });
		}
		res.status(500).json({ error: "The Bear information could not be modified." });
	});
});

module.exports = bearsRouter;