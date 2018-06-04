const router = require('express').Router();
const Bear = require('./bearModel'); // pull in our Bear model



router
  .route('/')
  .get((req, res) => {
    Bear.find() // This will find ALL resources at that model. 
      .then(bears => {
        res.status(200)
        res.json(bears)
      })
      .catch(error => {
        res.status(500)
        res.json({ errorMessage: "The bear information could not be retrieved."});
      })
  })
  .post((req, res) => {
    const { species, latinName } = req.body;
    if (!species || !latinName) {
      res.status(400);
      res.json({ errorMessage: "Please provide both species and latinName for the bear." });
      return;
    }
    const newBear = new Bear({ species, latinName });
    newBear 
      .save() // this will 'insert' a document into the Bear collection 
      .then(savedBear => {
        res.status(201);
        res.json(savedBear);

      })
      .catch(error => {
        res.status(500);
        res.json({ errorMessage: "There was an error while saving the bear to the database" });
      })
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Bear.findById(id) // find a specific resource in a collection by ID
      .then(foundBear => {
          if (foundBear.length === 0) {
            res.status(404);
            res.json({message: "The bear with the specified ID does not exist."});
            return;
          }
          res.status(200);
          res.json(foundBear);
      })
      .catch(error => {
        res.status(500);
        res.json({ errorMessage: "The bear information could not be retrieved." });
      })
  })
  .delete((req, res) => {
    const { id } = req.params;
    Bear.findByIdAndRemove(id) 
      .then(foundBear => { 
        if (foundBear.length === 0) {
          res.status(404);
          res.json({ errorMessage: "The bear with the specified ID does not exist."});
          return;
        }
        res.status(200);
        res.json({Success: `Bear with ID: ${id} has been deleted`});
      })
      .catch(error => {
        res.status(500);
        res.json({errorMessage: "The bear could not be removed"});
      })
    
  })
  .put((req, res) => {
    const { id } = req.params;
    const { species, latinName } = req.body;
    
    Bear.findByIdAndUpdate(id, {species, latinName})
      .then(updatedBear => {
        // if (updatedBear === 0) {
        //   res.status(404);
        //   res.json({message: "The bear with the specified ID does not exist."});
          
        // }
        res.json(updatedBear);
        console.log(updatedBear);
      })
      .catch(error => {
        res.status(500);
        res.json({ errorMessage: "The bear information could not be modified."})
      })
  });

module.exports = router;
