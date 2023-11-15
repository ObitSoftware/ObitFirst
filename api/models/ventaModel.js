import mongoose from 'mongoose';

const ventaSchema = new mongoose.Schema({
    nombreProducto: {
      type: String,
      require: true,
    },
    nombreCliente: {
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

