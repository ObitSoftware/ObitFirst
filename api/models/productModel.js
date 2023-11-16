import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productoId: {
    type: String,
  },
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
  },
  precio: {
    type: Number,
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number
  },
  fechaCreacion: {
    type: String
  },
  categoria: {
    type: Number,
    required: true,
  },
  proveedor: {
    type: Array,
  }

});

const Product = mongoose.model('Product', productSchema);

export default Product;
