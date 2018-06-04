const router = require('express').Router();
const Bear = require('./bearModel.js');

router
  .route('/')
  .get((req, res) => {
    Bear
      .find()
      .then(response => {
        res.status(200).json({
          data: response
        })
      })
      .catch(error => {
        res.status(500).json({
          error: "error"
        });
      })
    // .status(200).json({ route: '/api/bears/' });
  })
  .post((req, res) => {

    Bear.create(req.body)
      .then(response => {
        res.status(201).json('The Post was Successful')
      })
      .catch(error => {
        res.status(500).json("There was an error");
      })
  });

router
  .route('/:id')
  .get((req, res) => {
   // const { id } = req.params.id;
    Bear.findById(req.params.id)
      .then(response => {
        res.status(200).json({ data: response });
      })
      .catch(error => res.status(500).json("There was an error getting this bear."))
  })
  .delete((req, res) => {
    Bear.findByIdAndDelete(req.params.id)
      .then(response => {
        res.status(200).json({ status: "Delete"})
      })
      .catch(error => res.status(500).json("There was an error deleting The Bear"))
  })
  .put((req, res) => {
    Bear.findByIdAndUpdate(req.params.id, req.body)
      .then(response => {
        res.status(200).json("You successfully updated the bear's information")
      })
      .catch(error => res.status(500).json("There was an error in updating the bear's information"))
  });

module.exports = router;
