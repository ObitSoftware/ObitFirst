import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema({
    clienteId: {
        type: String,
        unique: true
    },
    nombre: {
        type: String,
        unique: true,
      },
    telefono: {
      type: Number,
      unique: true,
    },
    direccion: {
      type: String,
      unique: true,
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

