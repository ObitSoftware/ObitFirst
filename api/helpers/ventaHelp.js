import Product from '../models/productModel.js';

export const chequearReposicionStock = async () => {
    try {
      const productosBajoStock = await Product.find({ cantidad: { $lt: 10 } });
  
      return { productosBajoStock };
    } catch (error) {
      throw new Error('Error al verificar la reposición de stock: ' + error);
    }
  };
  
  export const sortProductsByStock = async () => {
    try {
      const products = await Product.find();
  
      // Ordena los productos por cantidad en stock de menor a mayor
      const sortedProducts = products.sort((a, b) => a.stock - b.stock);
  
      return {sortedProducts};
    } catch (error) {
      throw new Error('Error al ordenar los productos por stock:' + error);

    }
  };
