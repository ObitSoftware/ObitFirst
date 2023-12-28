import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  message:{ 
   type: String
  },
  addressee: { 
    type: [String]
  },
  date: { 
    type: String
  },
});

const Email = mongoose.model('Email', emailSchema);

export default Email;
