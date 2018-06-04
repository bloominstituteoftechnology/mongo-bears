const router = require('express').Router();
const Bear = require('./bearModel');

router
	.route('/')
	.get((req, res) => {
		Bear.find()
			.then(bears => {
				res.status(200).json(bears);
  			})
			.catch(err => {res.status(500).json({ error: "The information could not be retrieved."	})
			})
	})

	.post((req, res) => {
		const { species, latinName } = req.body
		if (!req.body.species || !req.body.latinName) {
			res.status(400);
			res.json({ errorMessage: "Please provide both species and latinName for the Bear."});
		}
		else {
			const newBear = new Bear({ species, latinName });
			newBear.save()
				.then(savedBear => {
					res.status(201);
					res.json({ savedBear });
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
	  	.catch(err => { res.status(404).json({ error: "The information could not be retrieved."	});
		});
	})

	.delete((req, res) => {
		const { id } = req.params;
		Bear.findByIdAndRemove(id)
			.then(removeBear => {
				res.status(200).json(removeBear);
			})
			.catch(err => {res.status(404).json({ error: "There was an error deleting the bear."})
			})
	})

	.put((req, res) => {		
		const { id } = req.params;
		const bearInfo = { species, latinName };
		Bear.findByIdAndUpdate(id, bearInfo)
			.then(updatedBear => {
				res.status(200).json(bear);
			})
			.catch(err => {res.status(500).send({ errorMessage: "There was an error updating the bear."});
		})
});

module.exports = router;
