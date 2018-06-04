const router = require(`express`).Router();

const Bear = require(`./bearModel`);

const db_thrown_error = require(`./db_thrown_error`);

// /api/bears
router
  .route(`/`)
  .get((req, res) => {
    Bear.find({})
      .then(bears => {
        if (bears === null) {
          res.status(404).json({ error: `No bears found!` });
        } else {
          res.status(200).json(bears);
        }
      })
      .catch(err => {
        const error = db_thrown_error({ error: err, type: `GET` });
        res.status(error.status).json(error.errorMessage);
      });
  })
  .post((req, res) => {
    // do some error checks
    if (req.body.species === undefined) {
      res.status(400).json({
        error: `Please enter a species name`,
      });
      return;
    }

    if (req.body.latinName === undefined) {
      res.status(400).json({
        error: `Please enter a latin name`,
      });
      return;
    }

    const bear = new Bear(req.body);

    bear
      .save()
      .then(savedBear => {
        // change the saved bear
        res.status(201).json(savedBear);
      })
      .catch(err => {
        const error = db_thrown_error({
          error: err,
          type: `POST`,
        });
      });
  });

router
  .route(`/:id`)
  .get((req, res) => {
    Bear.findById(req.params.id)
      .then(bear => {
        if (bear === null) {
          res.status(404).json({
            error: `The bear was not found!`,
          });
        } else {
          res.status(200).json(bear);
        }
      })
      .catch(err => {
        const error = db_thrown_error({ error: err, type: `GET` });
        res.status(error.status).json(error.errorMessage);
      });
  })
  .delete((req, res) => {
    const { id } = req.params;
    Bear.findByIdAndRemove(id)
      .then(response => {
        if (response === null) {
          res.status(404).json({ message: `Bear not found` });
        } else {
          res.status(200).json(response);
        }
      })
      .catch(err => {
        const error = db_thrown_error({ error: err, type: `DELETE` });
        res.status(error.status).json(error.errorMessage);
      });
  })
  .put((req, res) => {
    // const changes = { ...req.body, updatedOn:new Date() }

    Bear.findByIdAndUpdate(req.params.id, req.body)
      .then(updatedBear => {
        if (updatedBear === null) {
          res.status(404).json({ message: `Bear was not found` });
        } else {
          //update done, now get a fresh copy
          Bear.findById(updatedBear.id)
            .then(bear => {
              res.status(200).json(bear);
            })
            .catch(err => {
              const error = db_thrown_error({ error: err, type: `PUT` });
              res.status(error.status).json(error.errorMessage);
            }); // findById using the updated bear
        } //if ends
      })
      .catch(err => {
        const error = db_thrown_error({ error: err, type: `PUT` });
        res.status(error.status).json(error.errorMessage);
      }); // findByIdAndUpdate
  });

module.exports = router;
