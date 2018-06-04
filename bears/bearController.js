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
        res.status(201).json(dbRes);
      });
    });
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id: _id } = req.params;
    BearModel.find({ _id }, (err, dbRes) => {
      if (err) return res.status(500).json({ err: 'Error' });
      if (dbRes.length === 0) return res.status(404).json({ err: 'This poor bear doesnt even exist!' });
      res.json(dbRes);
    })
  })
  .delete((req, res) => {
    const { id } = req.params;
    BearModel.findByIdAndDelete(id, (err, dbRes) => {
      if (err) return res.status(500).json({ err: 'Error' });
      if (!dbRes) return res.status(404).json({ err: 'This poor bear doesnt even exist!' });
      res.json(dbRes);
    });
  })
  .put((req, res) => {
    const { id } = req.params;
    const { species, latinName } = req.body;
    BearModel.findByIdAndUpdate(id, { species, latinName }, (err, dbRes) => {
      if (err) return res.status(500).json({ err: 'Error' });
      if (!dbRes) return res.status(404).json({ err: 'This poor bear doesnt even exist!' });
    })
    .then(() => BearModel.findById(id, (err, dbRes) => {
      if (err) return res.status(500).json({ err: 'Error' });
      res.json(dbRes);
    }));
  });

module.exports = router;
