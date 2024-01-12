import mongoose from 'mongoose';

const notesSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  hour: { 
    type: String
  },
  message:{ 
   type: String
  },
  addresseeId: { 
    type: String
  },
  resolved: { 
    type: Boolean
  },
 
});

const Notes = mongoose.model('Notes', notesSchema);

export default Notes;
