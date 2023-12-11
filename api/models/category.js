import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    nombreCategoria: {
        type: String,
        required: true
      }
  });

const Categorias = mongoose.model('Categorias', categorySchema);

export default Categorias;

