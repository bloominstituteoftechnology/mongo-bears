const express = require('express');
const helmet = require('helmet');
const cors = require('cors'); // https://www.npmjs.com/package/cors
const bodyParser = require('body-parser');

const app = express();

const bearRouter = express.Router();

app.use(helmet()); // https://helmetjs.github.io/
app.use(cors());   // https://medium.com/trisfera/using-cors-in-express-cac7e29b005b
app.use(bodyParser.json());

bearRouter.route('/bears')
  .get((req, res) => {
    const responseJSON = { hello: 'This is my API' };
    res.json(responseJSON);
  });

app.use('/api', bearRouter);

app.get('/', function(req, res) {
  res.status(200).json({ status: 'API Running' });
});

const port = process.env.PORT || 5005;
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
});
