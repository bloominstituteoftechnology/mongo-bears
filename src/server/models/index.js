import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Bear = new Schema ({
  species: {
    type: String,
    required: true
  },
  latinName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Bear', Bear);
