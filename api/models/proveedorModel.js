import mongoose from 'mongoose';

const proveedorSchema = new mongoose.Schema({
  proveedorId: {
     type: String,
     unique:true,
  },
  nombre: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
});

const Proveedor = mongoose.model('Proveedor', proveedorSchema);


export default Proveedor;
