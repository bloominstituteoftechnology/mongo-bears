const express = require('express');

const Bear = require('./Schema.js');

const BearRouter = express.Router();

BearRouter.post('/api/bears', function(req, res) {
		const BearInfo = req.body

		const bear = new Bear(BearInfo);

		bear
		 .save()
		 .then(savedBear => {
				 res.status(201).json(savedBear);
		})
		 .catch(err => {
			console.log(err);	 
			 res.status(400).json({ errorMessage: "Please provide both species and latinName for the Bear." });
		});
});

BearRouter.get('/api/bears', function(req, res) {
		Bear.find({})
		  .then(bears => {
				res.status(200).json(bears);
		 })
			.catch(err => {
					res.status(500).json({ error: "The information could not be retrieved." });
			});
});

module.exports = BearRouter;		 
