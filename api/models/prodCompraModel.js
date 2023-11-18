import mongoose from 'mongoose';

const prodCompraSchema = new mongoose.Schema({
    prodCompraId: {
        type: String,
        unique: true
    },
    proveedorId: {
        type: String,
        required: true
      },
    productoId: {
      type: String,
      required: true,
    },
    precioProducto: {
      type: Number,
      required: true,
    },
    fechaCompra: {
      type: String,
      required: true,
    },
    fechaPago: {
      type: String,
      required: true,
    },
    observacionesCompra: {
        type: String,
        required: true,
      },
    cantidad: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
      }
  });

const ProdCompra = mongoose.model('Detalle', prodCompraSchema);

export default ProdCompra;