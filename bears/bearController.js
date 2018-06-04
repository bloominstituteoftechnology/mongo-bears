const router = require('express').Router();
const BearModel = require('../bearsSchema');

router
  .route('/')
  .get((req, res) => {
    BearModel.find({}, (err, dbRes) => {
      if (err) return res.status(500).json({ err });
      res.json(dbRes);
    });
  })
  .post((req, res) => {
    const { species, latinName } = req.body;
    const bear = new BearModel({ species, latinName });
    BearModel.find({ species }, (err, dbRes) => {
      if (err) return res.status(500).json({ err: 'Error' });
      if (dbRes.length > 0) return res.status(422).json({ err: 'This bears already here!' });
      bear.save((err, dbRes) => {
        if (err) {
          if (err.code === 11000) return res.status(422).json({ err: 'Please choose a different latin name' });
          return res.status(500).json({err})
        }
        res.json(dbRes);
      });
    });
  });

router
  .route('/:id')
  .get((req, res) => {
    res.status(200).json({ route: '/api/bears/' + req.params.id });
  })
  .delete((req, res) => {
    res.status(200).json({ status: 'please implement DELETE functionality' });
  })
  .put((req, res) => {
    res.status(200).json({ status: 'please implement PUT functionality' });
  });

module.exports = router;
