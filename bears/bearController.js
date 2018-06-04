const router = require('express').Router();
const Bear = require('./bearModel.js');

router
	.route('/')
	.get((req, res) => {
		console.log(Bear.find);
		Bear.find()
			.then(bears => {
				res.status(200).json(bears);
  			})
			.catch(err => res.status(500).json({ error: "The information could not be retrieved."	})
			)
	})

	.post((req, res) => {
		const { species, latinName } = req.body
		const newBear = new Bear({ species, latinName });
		if (!req.body.species || !req.body.latinName) {
			res.status(400);
			res.json({ errorMessage: "Please provide both species and latinName for the Bear."});
		}
		else {
			newBear.save()
				.then(Bear => {
					res.status(201);
					res.json({ Bear });
				})
				.catch(err => {
					res.status(500)
					res.json({ error: "There was an error saving the bear to the database." })
			})
		}
	})
router
	.route('/:id')
	.get((req, res) => {
	const { id } = req.params;
		Bear.findById(id)
	  		.then(foundBear => {
				res.status(200).json(foundBear);
		})
	  	.catch(err => { res.status(404).json({ error: "The bear with the specified ID could not be retrieved."	});
		});
	})

	.delete((req, res) => {
		const { id } = req.params;
		Bear.findByIdAndRemove(id)
			.then(removeBear => {
				res.status(200).json(removeBear);
			})
			.catch(err => {res.status(404).json({ error: "The bear with the specified ID could not be found."});
			})

	.put((req, res) => {		
		const { id } = req.params;
		const bearInfo = { species, latinName };
		Bear.findByIdAndUpdate(id, bearInfo)
			.then(updatedBear => {
				res.status(200).json(bear);
			})
			.catch(err => {res.status(404).send({ errorMessage: "The bear with the specified ID could not be found."});
			})
	})
	})
module.exports = router;
