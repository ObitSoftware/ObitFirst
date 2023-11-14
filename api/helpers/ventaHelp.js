import Product from '../models/productModel.js';

export const decrementarStock = async (productoId, cantidad) => {
  const product = await Product.findById(productoId);
  product.stock -= cantidad;
  await product.save();
};
export const incrementarStock = async (productoId, cantidad) => {
    const product = await Product.findById(productoId);
    product.stock += cantidad;
    await product.save();
  };

export const chequearReposicionStock = async () => {
    try {
      const productosBajoStock = await Product.find({ cantidad: { $lt: 10 } });
  
      return { productosBajoStock };
    } catch (error) {
      throw new Error('Error al verificar la reposición de stock: ' + error);
    }
  };
  
