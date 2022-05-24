import mongoose from 'mongoose';

const chainDataSchema = new mongoose.Schema({
  chain: {
    type: String,
    required: true,
  },
  account: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
});

export default mongoose.model('ChainData', chainDataSchema);
