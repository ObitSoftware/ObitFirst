import express from 'express';
const productRoutes = express.Router();

import {getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, addNewCategory} from '../controllers/productController.js';

productRoutes.get('/', getAllProducts);
productRoutes.get('/:productId', getProductById);
productRoutes.post('/', createProduct);
productRoutes.post('/addCategory', addNewCategory);
productRoutes.put('/:productId', updateProduct);
productRoutes.delete('/:productId', deleteProduct);


export default productRoutes;
