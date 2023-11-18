import express from 'express';
const prodcompraRoutes = express.Router();

import {createProdCompra, deleteProdCompra} from '../controllers/prodCompraController.js';

// PRODUCTO DE LA COMPRA 

prodcompraRoutes.post('/', createProdCompra);
prodcompraRoutes.delete('/:prodCompraId', deleteProdCompra);


export default prodcompraRoutes;
