import express from 'express';
const prodcompraRoutes = express.Router();

import {createProdCompra, deleteProdCompra} from '../controllers/prodCompraController.js';


prodcompraRoutes.post('/', createProdCompra);
prodcompraRoutes.delete('/:prodCompraId', deleteProdCompra);


export default prodcompraRoutes;
