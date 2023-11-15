import mongoose from 'mongoose';

const ventaSchema = new mongoose.Schema({
    productoId: {
      type: String,
      require: true,
    },
    clienteId: {
      type: String,
      required: true
    },
    precio: {
      type: Number,
      required: true
    },
    cantidad: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    fechaCreacion: {
      type: Number,
      default: Date.now()
    }
  });

const Venta = mongoose.model('Venta', ventaSchema);

export default Venta;

