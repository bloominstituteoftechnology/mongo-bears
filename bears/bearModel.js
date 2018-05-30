const mongoose = require('mongoose');

const definition = {
    species: "American Black Bear", // String, required
    latinName: "Ursus americanus",  // String, required
    createdOn: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, required, defaults to current date
  };

const bearSchema = new Mongoose.Schema(definition);