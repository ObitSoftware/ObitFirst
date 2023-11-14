import express from 'express';
const productRoutes = express.Router();

import {getAllProducts, getProductById, createProduct, updateProduct, deleteProduct} from '../controllers/productController.js';

productRoutes.get('/', getAllProducts);
productRoutes.get('/:productId', getProductById);
productRoutes.post('/', createProduct);
productRoutes.put('/:productId', updateProduct);
productRoutes.delete('/:productId', deleteProduct);


export default productRoutes;
