const mongoose = require('mongoose');

const proveedorSchema = new mongoose.Schema({
  proveedorId: {
     type: String,
     unique:true,
  },
  nombre: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Proveedor', proveedorSchema);
