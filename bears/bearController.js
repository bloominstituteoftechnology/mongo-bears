const router = require('express').Router();
const Bear = require('./bearModel');

let errorMessage = (errorCode, message, res) => {
  res.status(errorCode).json({error: message});
  return;
};

router
  .route('/')
  .get((req, res) => {
    Bear.find()
      .then( bears => {
        res.status(200).json(bears);
      })
      .catch(error => {
        errorMessage(500, "Bork", res);
        return;
      })
  })

  .post((req, res) => {
    const { species, latinName, } = req.body;
    const newBear = Bear({ species, latinName });
    if (!species || !latinName) {
      errorMessage(400, "Please provide both species and latinName for the bear.", res);
    }
    newBear
          .save()
          then(newBear => {
            res.status(201).json(newBear);
          })
          .catch(error => {
            res.status(500).json({ errorMessage: "Server error while adding bear."})
          })
      });
    
   

router
  .route('/:id')
  .get((req, res) => {
  const { id } = req.params;

  Bear.findById(id)
    .then( bear => {
      res.json(bear);
    })
    .catch(error => { 
      console.log(error);
      if(error.name === "CastError") {
        errorMessage(404, `Cannot find bear with ID ${id}.`, res);
      }
      errorMessage(500, 'Cannot retrieve information from database.', res);
    })
  })
  
  .delete((req, res) => {
    const { id } = req.params;

    Bear.findByIdAndRemove(d)
      .then(bear => {
        res.json(bear);
      })
      .catch(error => { 
        errorMessage(400, 'This bear does not exist.', res);
      })
  })
  .put((req, res) => {
    const { id } = req.body;
    Bear.findByIdAndUpdate(id, { species, latinName })
      .then(bear => {
        res.json(bear);
      })
      .catch(error => {
        errorMessage(400, 'An unavoidable error has occurred. Sorry...', res);
      })
  });

module.exports = router;
