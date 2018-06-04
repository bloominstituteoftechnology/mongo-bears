const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

/**
 * IMPORT: Monggose stuff.
 */
// import Mongoose
const mongoose = require('mongoose');
/**
 * Define: DB to use.
 * if DB already in MongoDB: use it.
 * else: creates a new one.
 */
let db_Name = 'bears';

const bearController = require('./bears/bearController');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/bears', bearController);

server.get('/', function(req, res) {
  res.status(200).json({ api: 'running' });
});

mongoose.connect(`mongodb://localhost/${db_Name}`);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`\n=== API running on http://localhost:${port} ===\n`);
});
