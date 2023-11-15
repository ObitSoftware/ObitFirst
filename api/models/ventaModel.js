import mongoose from 'mongoose';

const ventaSchema = new mongoose.Schema({
    ventaId: {
        type: String,
        required: true,
        unique: true
    },
    productoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    cantidad: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  });

const Venta = mongoose.model('Venta', ventaSchema);

export default Venta;

