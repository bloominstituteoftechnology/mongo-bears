import Bear from '../../models';
import { handleUserError } from '../../app';

export const deleteBearByID = (req, res) => {
  console.log('======/bears/:id | DELETE======');
  console.log(`  Request: ${req.originalUrl}`);
  console.log(`  From: ${req.headers.origin}`);
  console.log(`  Params: ${JSON.stringify(req.params)}`);
  Bear.findOne().where('_id').equals(req.params.id).exec((err, data) => {
    if (data != null) {
      return Bear.deleteOne(data).then((err, result) => res.send({action: 'DELETE', bear: data, result})); 
    }
    handleUserError({ error: "RAAAAARRRR!!! Did that scare you? There wasn't even a bear here. It was just me." }, res);
  });
}
