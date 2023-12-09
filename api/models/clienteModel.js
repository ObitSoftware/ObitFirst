import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema({
    nombre: {
        type: String,
      },
    telefono: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
    },
    dni: {
      type: Number,
      required: true,
    }
  });

const Cliente = mongoose.model('Cliente', clienteSchema);

export default Cliente;

