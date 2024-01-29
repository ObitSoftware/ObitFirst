import mongoose from 'mongoose';

const cashSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  lastMovements: {
    type: Array
  },
});

const Cash = mongoose.model('Cash', cashSchema);

export default Cash;