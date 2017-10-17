import Bear from '../../models';
import { handleUserError } from '../../app';

export const getBears = (req, res) => {
  console.log('======/bear | GET======');
  console.log(`  Request: ${req.originalUrl}`);
  console.log(`  From: ${req.headers.origin}`);
  const bears = []
  Bear.find().exec((err, data) => {
    if (data != null)
      data.forEach(bear => bears.push(bear));
    if (bears.length === 0)
      return res.send({ umm: "Well... This is awkward." });
    res.send({bears});
  });
}

export const getBearByID = (req, res) => {
  console.log('======/bear/:id | GET======');
  console.log(`  Request: ${req.originalUrl}`);
  console.log(`  From: ${req.headers.origin}`);
  console.log(`  Params: ${JSON.stringify(req.params)}`);
  Bear.findOne().where('_id').equals(req.params.id).exec((err, data) => {
    if (data != null)
      return res.send(data);
    handleUserError({ error: "This place you have come to is bare of bears." }, res);
  });
}
