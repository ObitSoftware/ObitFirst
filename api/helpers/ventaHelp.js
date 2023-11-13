import Product from '../models/productModel';

const decrementarStock = async (productoId, cantidad) => {
  const product = await Product.findById(productoId);
  product.stock -= cantidad;
  await product.save();
};
const incrementarStock = async (productoId, cantidad) => {
    const product = await Product.findById(productoId);
    product.stock += cantidad;
    await product.save();
  };

  

module.exports = { decrementarStock , incrementarStock};