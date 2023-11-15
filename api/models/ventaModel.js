import mongoose from 'mongoose';

const ventaSchema = new mongoose.Schema({
    ventaId: {
        type: String,
        unique: true
    },
    productoId: {
      type: String,
      require: true,
    },
    clienteId: {
      type: String,
      unique: true
    },
    precio: {
      type: Number,
      ref: 'Product',
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

