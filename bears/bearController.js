const router = require( 'express' ).Router();
const Bear = require( './bearModel' );


router
  .route( '/' )
  .get( ( req, res ) =>
  {
    Bear.find()
      .then( bears =>
      {
        res.status( 200 ).json( bears );
      } )
      .catch( err =>
      {
        res.status( 500 ).json( { error: 'Error' } )
      } );
  } )

  .post( ( req, res ) =>
  {
    const { species, latinName } = req.body;
    const newBear = new Bear( { species, latinName } );
    newBear
      .save() // Returns as a promise
      .then( savedBear =>
      {
        res.status( 201 ).json( savedBear );
      } )
      .catch( error =>
      {
        res.status( 422 ).json( { error: err } );
      } )
    // res.status(201).json({ status: 'please implement POST functionality' });
  } );

router
  .route( '/:id' )
  .get( ( req, res ) =>
  {
    const { id } = req.params;
    Bear.findById( id )
      .then( foundBear =>
      {
        res.status( 200 ).json( foundBear );
      } )
      .catch( err =>
      {
        res.status( 404 ).json( { error: 'error finding by id' } );
      } )
    // res.status(200).json({ route: '/api/bears/' + req.params.id });
  } )
  .delete( ( req, res ) =>
  {
    const { id } = req.params;
    // findByIdAndRemove
    Bear.findByIdAndRemove( id )
      .then( bearRemoved =>
      {
        res.status( 200 ).json( bearRemoved );
      } )
      .catch( err =>
      {
        res.status( 500 ).json( { status: 'error you cannot delete, id not found' } )
      } )
    // res.status(200).json({ status: 'please implement DELETE functionality' });
  } )
  .put( ( req, res ) =>
  {
    const { id } = req.params;
    const updates = ( { species, latinName } = req.body );
    // findByIdAndUpdate
    Bear.findByIdAndUpdate( id, updates, { new: true } )
      .then( bear =>
      {
        res.json( bear );
      } )
      .catch( err =>
      {
        res.status( 500 ).json( { status: 'error didnt find what your looking for' } );
      } )
    // res.json(200).json({ status: 'please implement PUT functionality' });
  } );

module.exports = router;
