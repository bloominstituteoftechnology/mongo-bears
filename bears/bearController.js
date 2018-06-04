const router = require('express').Router(); // declare that all routes for this address will be found on this router
const Bear = require('./bearModel'); // pull in our Bear model

// Configure the API to respond to the following routes:

// Method	Endpoint	Description
// POST	/api/bears	Creates a bear using the information sent inside the request body.
// GET	/api/bears	Returns an array of all the bear objects contained in the database.
// GET	/api/bears/:id	Returns the bear object with the specified id.
// DELETE	/api/bears/:id	Removes the bear with the specified id and returns the deleted bear.
// PUT	/api/bears/:id	Updates the bear with the specified id using data from the request body. Returns the modified document, NOT the original.

//https://www.cheatography.com/kstep/cheat-sheets/http-status-codes/ 

router
  .route('/')
  .get((req, res) => {
    Bear.find()  // This will find ALL resources at that model.
    .then(bears => {
      res.status(200).json(bears); //200 ok
    })
    .catch(err => {
      res.status(500).json({error: 'Error fetching bears' }); // incomplete / 500: Internal Server Error
    })
  })
  .post((req, res) => {
    const { species, latinName } = req.body;
    const newBear = new Bear({species, latinName});
    newBear
      .save() // this will `insert` a document into the Bear collection
      .then(savedBear => { 
        console.log(savedBear);
        res.status(201).json(savedBear); //201:Created
      })
      .catch(err => {
        res.status(422).json({error: err}) //401: Unproc­essable Entity 
      });
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Bear.findById(id) // find a specific resource in a collection by ID
    .then(foundBear => {
      res.status(200).json(foundBear); //200: ok
    })
    .catch(err => {
      res.status(404).json({error: 'No bear by that id in DB'}); //Not Found 
    })
  })
  .delete((req, res) => {
    // findByIdAndRemove
    const { id } = req.params; 
    Bear.findByIdAndRemove(id) // find a specific resource in a collection by ID to remove from db
      .then(removedBear => {
        res.status(200).json(removedBear);
      })
      .catch(error => {
        res.status(500).json({errorMessage: "The bear information could not be modified."})
      })
    // res.status(200).json({ status: 'please implement DELETE functionality' });
  })
  .put((req, res) => {
    const { species, latinName } = req.body;
    const { id } = req.params;
    Bear
      .findByIdAndUpdate(id, { species, latinName } )
      .then(bear => {
        res.json(bear);
      })
      .catch(error => {
        res.status(500).json({error: 'Cannot update db with your entry for bear'})
      })
   
  });

module.exports = router;
