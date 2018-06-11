const router = require('express').Router();
const Bear = require('./bearModel');

const sendUserError = (status, message, res, err="Not From Catch") => {
  res.status(status).json({Error: message, err});
  return;
}

const get = (req, res) => {
  Bear.find()
    .then(bears =>{
      res.status(200).json(bears)
    })
    .catch(err =>{
      sendUserError(500, "There was an error is retrieving bears object", res, err)
    });
}
const post = (req, res) => {
  const { species, latinName } = req.body;
  // if(!species||!latinName){ //useful but not needed
  //   console.log("if happened");
  //   sendUserError(400, "Please enter species and Latin Name", res);
  //   // res.status(400).json({Error: "Please enter species and Latin Name"});
  // }
    const bear = new Bear({ species, latinName });
  bear
    .save()
    .then(bear =>{
      res.status(201).json(bear);
    })
    .catch(err =>{
      sendUserError(500, "There was an error in saving bear to database", res, err)
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
      sendUserError(500, "There was an error is fetching bear", res, err)
    })
}

const deleteId = (req, res) => {
  const { id } = req.params;
  Bear

    .remove({ _id: id }) //_id is what Mongo uses
    .then(result =>{
      res.status(204).json(`Success: Bear with ${id} deleted successfully from database`)
    })
    .catch(err =>{
      sendUserError(500, "There was an error in deleting bear", res, err)
    });
}
const updateId = (req, res) => {
  const { id } = req.params;
  const { species, latinName } = req.body;

  if(!id){
    sendUserError(404, `There was an error in fetching bear with ${id}`, res)
  }
  // Tank.update({ _id: id }, { $set: { size: 'large' }}, callback);
  Bear.update({ _id: id } , { $set: { species, latinName }})
    .then(bear => {
      res.status(200).json(bear)
    })
    .catch(err =>{
      sendUserError(500, "There was an error in updating bearId in database", res, err)
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
