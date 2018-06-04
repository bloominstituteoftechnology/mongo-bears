const router = require('express').Router();
const bearModel = require('./bearModel');

const errorHandle = (res, error, operation = "CRUD", routeString = "", errorMessage = "Server could not process request.",statusCode = 500) => {
  console.log(`${routeString} ${operation} ERROR:`,error);
  res.status(statusCode).json({errorMessage});
}

router
  .route('/')
  .get((req, res) => {
    bearModel.find()
      .then(bears => {
        res.status(200).json(bears);
      })
      .catch(err => errorHandle(res, err, "GET", '/api/bears', "The bear information could not be retrieved."));
  })
  .post((req, res) => {
    const { species, latinName } = req.body;
    if (!species || !latinName) {
      res.status(400).json({ errorMessage: "Please provide both species and latinName for the bear."});
      return;
    }
    //==> 
    bearModel.create({ species, latinName })
      .then(bear => {
        res.status(201).json(bear);
      })
      .catch(err => errorHandle(res, err, "POST", '/api/bears', "There was an error while saving the bear to the database"));
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    //==> 
    bearModel.findById(id)
      .then(bear => {
        if (bear === null) {
          res.status(404).json({ message: "The bear with the specified ID does not exist." });
          return;
        }
        res.status(200).json(bear);
      })
      .catch(err => errorHandle(res, err, "GET", `/api/bears${id}`, "The bear information could not be retrieved."));
  })
  .delete((req, res) => {
    const { id } = req.params;
    //==> 
    bearModel.findByIdAndRemove(id)
      .then(bear => {
        if (bear === null) {
          res.status(404).json({ message: "The bear with the specified ID does not exist." });
          return;
        }
        res.status(200).json(bear);
      })
      .catch(err => errorHandle(res, err, "DELETE", `/api/bears${id}`, "The bear could not be removed"));
  })
  .put((req, res) => {
    const { id } = req.params;
    //==>
    bearModel.findByIdAndUpdate(id, req.body, { new: true })
      .then(bear => {
        if (bear === null) {
          res.status(404).json({ message: "The bear with the specified ID does not exist." });
          return;
        }
        res.status(200).json(bear);
      })
      .catch(err => errorHandle(res, err, "PUT", `/api/bears${id}`, "The bear information could not be modified."));
  });

module.exports = router;
