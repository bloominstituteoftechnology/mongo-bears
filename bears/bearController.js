const router = require('express').Router();
const Bear = require('./bearmodel');

router
  .route('/')
  .get((req, res) => {
    Bear.find()
      .then(response => {
        res.status(200).json(response);
      })
      .catch(e => {
        e.statusCode = 500;
        e.errorMessage = 'Oh, oh.... there is a problem bargain with the dababase, try again!';
        xt(e);
      });
  })
  .post((req, res) => {
    const Oso_Gafufos = new Bear({
      name: 'Oso de Gafufos',
      species: 'Ursus gafufos',
    });
    Oso_Gafufos.save(function(err, Oso_Gafufos) {
      if (err) return next(err);
      res.status(201).json(Oso_Gafufos);
    });
  });

router
  .route('/:id')
  .get((req, res, next) => {
    const { id } = req.params;
    // Bear.findOne({ _id: id }, function(err, bear) {
    //   if (err) return next(err);
    //   res.status(200).json(bear);
    // });
    Bear.findOne({ _id: id })
      .then(response => {
        res.status(200).json(response);
      })
      .catch(e => {
        e.statusCode = 500;
        e.errorMessage = 'Oh, oh.... there is a problem bargain with the dababase, try again!';
        next(e);
      });
  })
  .delete((req, res, next) => {
    const { id } = req.params;
    Bear.deleteOne({ _id: id })
      .then(response => {
        res.status(200).json(response);
      })
      .catch(e => {
        e.statusCode = 500;
        next(e);
      });
  })
  .put((req, res, next) => {
    const { id } = req.params;
    const { name = 'a Bear', species = 'Urus __' } = req.body;
    Bear.update({ _id: id }, { $set: { name, species } })
      .then(response => {
        res.status(200).json({ response: response });
      })
      .catch(e => {
        e.statusCode = 500;
        e.errorMessage = 'Oh, oh.... there is a problem bargain with the dababase, try again!';
        next(e);
      });
  });

module.exports = router;
