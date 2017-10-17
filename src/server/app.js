// npm modules
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

/* === Models === */
import Bear from './models';

/* === Routes === */
import { getBears, getBearByID } from './routes';
import { postBear } from './routes';
import { deleteBearByID } from './routes';

const STATUS_USER_ERROR = 422;
const PORT = 3000;

const app = express();
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mongoi-mini', { useMongoClient: true });

app.use(bodyParser.json());
app.use(express.static('public', {
  index: false
}));

app.get('/', (req, res) => res.redirect('/bears'));
app.get('/bears', getBears);
app.get('/bears/:id', getBearByID);
app.post('/bears', postBear);
app.delete('/bears/:id', deleteBearByID);

app.listen(PORT);
console.log(`Server running at http:/localhost/:${PORT}`);

export default app;

export const handleUserError = (message, res) => {
  res.status(STATUS_USER_ERROR).send(message);
};
