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
		res.status(201).json(savedBear);
	}).catch(err => {
		res.status(500).json({ error: "There was an error while saving the Bear to the Database" });
	});
});

// get all bears
bearsRouter.get('/', function(req, res) {
	Bear.find({})
	.then(bears => {
		res.json(bears);
	})
	.catch(err => {
		res.status(500).json({ error: "The information could not be retrieved." });
	});
});

// get number or counts of all documents
bearsRouter.get('/counts', function(req, res) {
	Bear.count({})
	.then(counts => {
		res.json(counts);
	})
	.catch(err => {
		res.status(500).json({ error: "The information could not be retrieved." });
	});
});

// find bears by species and send back bears with property: latinName
bearsRouter.get('/:species', function(req, res) {
	const species = req.params.species;
	Bear.find({species: species})
	.select('latinName')
	.exec(function (err, bears) {
		if(err) return handleError(err);
		res.json(bears);
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
		res.json(bear);
	}).catch(err => {
		if(err.reason === undefined){
			res.status(404).json({ message: "The Bear with the specified ID does not exist." });
		}
		res.status(500).json({ error: "The Bear information could not be modified." });
	});
});

module.exports = bearsRouter;