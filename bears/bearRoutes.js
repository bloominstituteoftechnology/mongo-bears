const express = require('express');

const Product = require('./BearModel.js');

const bearsRouter = express.Router();

// /products
bearsRouter.post('/', function(req, res) {
  // const productInfo = req.body;

  // const product = new Product(productInfo);

  // product
  //   .save()
  //   .then(savedProduct => {
  //     res.status(201).json(savedProduct);
  //   })
  //   .catch(err => {
  //     res.status(500).json({ msg: 'error creating product', error: err });
  //   }); // returns a promise
});

bearsRouter.get('/', function(req, res) {
  // Product.find({})
  //   .then(products => {
  //     res.status(200).json(products);
  //   })
  //   .catch(err => {
  //     res.status(500).json({ msg: 'error gettin the products', error: err });
  //   });
});

module.exports = bearsRouter;
