import Bear from '../../models';
import { handleUserError } from '../../app';

export const postBear = (req, res) => {
  console.log('======/bear | POST======');
  console.log(`  Request: ${req.originalUrl}`);
  console.log(`  From: ${req.headers.origin}`);
  console.log(`  Data: ${JSON.stringify(req.body)}`);
  const { species, latinName } = req.body;
  const missing = [];
  if (species == null)
    missing.push('species');
  if (latinName == null)
    missing.push('latinName');
  if (missing.length > 0)
    return handleUserError({ error: 'You are missing some real serious data.', missing }, res);

  const bear = new Bear({ species, latinName });
  bear.save((err, newBear) => {
    if (err)
      return handleUserError(err, res);
    res.json(newBear);
  });
}
