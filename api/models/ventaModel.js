import mongoose from 'mongoose';

const ventaSchema = new mongoose.Schema({
    ventaId: {
        type: String,
        unique: true
    },
    productoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    clienteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
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

