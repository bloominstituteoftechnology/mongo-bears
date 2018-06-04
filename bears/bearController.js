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
    const Oso_Anteojos = new Bear({
      name: 'Oso de anteojos',
      species: 'Ursus with glasses',
    });
    Oso_Anteojos.save(function(err, Oso_Anteojos) {
      if (err) return next(err);
      res.status(201).json(Oso_Anteojos);
    });
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Bear.findOne({ _id: id }, function(err, bear) {
      if (err) return next(err);
      res.status(200).json(bear);
    });
  })
  .delete((req, res) => {
    res.status(200).json({ status: 'please implement DELETE functionality' });
  })
  .put((req, res) => {
    res.status(200).json({ status: 'please implement PUT functionality' });
  });

module.exports = router;
