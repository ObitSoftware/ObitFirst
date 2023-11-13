import express from 'express';
const router = express.Router();

import {getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, chequearReposicionStock} from '../controllers/productController';

router.get('/', getAllProducts);
router.get('/:productId', getProductById);
router.post('/', createProduct);
router.put('/:productId', updateProduct);
router.delete('/:productId', deleteProduct);
router.get('/chequeoStock', chequearReposicionStock);

export default router;
