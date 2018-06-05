const router = require('express').Router();

const Bear = require('./bearSchema');


router.get('/',(req, res) => {
    Bear.find()
      .then(bears => {
        res.status(202).json({ route: '/api/bears/' + req.params });
      })
      .catch(error => {
        res.status(500).json({ error: 'No Bears at this Location' });
      })
      
  router.post('/',(req, res) => {
        const { species, latinName } = req.body;
        const newBear = new Bear({ species, latinName });
        newBear
          .save()
          .then(savedBear => {
            res.status(201).json(savedBear);
          })
          .catch(error => {
            res.status(422).json({ error: err });
          });
      });

  });


  
router.get('/:id',(req, res) => {
    res.status(200).json({ route: '/api/bears/' + req.params.id });
  })

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Bear.findByIdAndRemove(id)
    .then(bear => {
        res.status(404).json({ status: 'The bear with the specified ID does not exist.' });
    })
    .catch(err => res.status(500).json(err));
  });

router.put('/:id', (req, res) => {
  const { id } = req.params;
  
  Bear.findbyIdAndUpdate(id, req.body).then(bear => {
    if (bear) {
      res.status(200).json(bear);
    } else {
      res.status(404).json({ status: '"The bear with the specified ID does not exist' });
    }
  })
    .catch(err => res.status(500).json(err));
});
    


function get(req, res) {
  res.status(200).json({ route: '/api/bears/' });
}

function post(req, res) {
  const bearData = req.body;
  const bear = new Bear(bearData);

  bear
    .save() //returns a promise
    .then(bear => {
      res.status(201).json(bear);
    })
    .cath(error => {
      res.status(500).json(error);
    });
}

module.exports = router;
