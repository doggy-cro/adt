import mongoose from 'mongoose';

const chainDataSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
});

export default mongoose.model('ChainData', chainDataSchema);
