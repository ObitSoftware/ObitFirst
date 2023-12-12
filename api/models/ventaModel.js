import mongoose from 'mongoose';

const ventaSchema = new mongoose.Schema({
  idProducto: {
    type: String,
    require: true,
  },
  nombreProducto: {
    type: String,
    require: true,
  },
  categoriaProducto: {
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
  gananciaNeta: { 
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
    type: String,
  }
});

const Venta = mongoose.model('Venta', ventaSchema);

export default Venta;

