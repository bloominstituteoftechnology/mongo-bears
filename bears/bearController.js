const router = require('express').Router();
const Bear = require('./bearModel');

const sendUserError = (status, message, res) => {
  res.status(status).json({Error: message}, res);
  return;
}

const get = (req, res) => {
  Bear.find()
    .then(bears =>{
      res.status(200).json(bears)
    })
    .catch(err =>{
      sendUserError(500, "There was an error is retrieving bears object", res)
    });
}
const post = (req, res) => {
  const bearData = req.body;

  const bear = new Bear(bearData);
  if(!species || !latinName){
    sendUserError(400, "object must contain species and latinName", res)
  }
  bear
    .save()
    .then(bear =>{
      if (!bear){
        sendUserError(404, "Client Error in saving bear", res)
      }
      res.status(201).json(bear);
    })
    .catch(err =>{
      sendUserError(500, "There was an error in saving bea to database", res)
    })
}

const getId = (req, res) => {
  const { id } = req.params;

  Bear.findById(id)
    .then(bear =>{
      if (bear.length===0){
        sendUserError(404, `There was an error in fetching bear with ${id}`, res)
      }
      res.status(200).json(bear)
    })
    .catch(err =>{
      sendUserError(500, "There was an error is fetching bear", res)
    })
}

const deleteId = (req, res) => {
  const { id } = req.params;

  if(!id){
    sendUserError(404, `There was an error in fetching bear with ${id}`, res)
  }
  Bear
    .remove(id)
    .then(bear =>{
      res.status(204).json(bear)
    })
    .catch(err =>{
      sendUserError(500, "There was an error in deleting bear", res)
    });
}
const updateId = (req, res) => {
  const { id } = req.params;
  const { species, latinName } = req.body;

  if(!id){
    sendUserError(404, `There was an error in fetching bear with ${id}`, res)
  }
  getId(id)
  Bear.update(id, { species, latinName })
    .then(bear => {
      res.status(200).json(bear)
    })
    .catch(err =>{
      sendUserError(500, "There was an error in updating bearId in database", res)
    });
  }
router //groups endpoints by pathname
  .route('/')
  .get(get)
  .post(post);

router
  .route('/:id')
  .get(getId)
  .delete(deleteId)
  .put(updateId);


module.exports = router;
