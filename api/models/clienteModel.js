import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema({
    clienteId: {
        type: String,
        unique: true
    },
    nombre: {
        type: String,
        ref: 'Product',
      },
    telefono: {
      type: Number,
      ref: 'Product',
    },
    direccion: {
      type: String,
      ref: 'Product',
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

