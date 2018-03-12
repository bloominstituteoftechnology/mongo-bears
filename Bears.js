const express = require('express');

const Bear = require('./Schema.js');

const BearRouter = express.Router();

BearRouter.post('/api/bears', function(req, res) {
		const BearInfo = req.body
     if (!BearInfo.species || !BearInfo.latinName)
        res.status(400).json({ errorMessage: "Please provide both species and and latinName for the Bear."
     });

		const bear = new Bear(BearInfo);

		bear
		 .save()
		 .then(savedBear => {
				 res.status(201).json(savedBear);
		})
		 .catch(err => {
			 res.status(500).json({ error: "There was an error while saving the Bear to the Database"
		});
	});
})

BearRouter.get('/api/bears', function(req, res) {
		Bear.find({})
		  .then(bears => {
				res.status(200).json(bears);
		 })
			.catch(err => {
					res.status(500).json({ error: "The information could not be retrieved."
			});
   });
})

BearRouter.get('/api/bears/:id', function(req, res) {
    const { id } = req.query;
		  console.log(Bear);
	/*	if (!Bear.find({ id: id})
		  res.status(404).json({ message: "The Bear with the specified ID does not exist." 
		});*/

		Bear.find({})
	  .then(bears => {
				res.status(200).json(bears);
		})
     .catch(err => {
				 res.status(500).json({  error: "The information could not be retrieved." 
  	});
});
})
module.exports = BearRouter;		 
