import express from 'express';
const comprasRoutes = express.Router();

import {getAllCompras, getCompraById, createCompra, updateCompra, deleteCompra} from '../controllers/comprasController.js';




// COMPRA

comprasRoutes.get('/', getAllCompras);
comprasRoutes.get('/:comprasId', getCompraById);
comprasRoutes.post('/', createCompra);
comprasRoutes.put('/:comprasId', updateCompra);
comprasRoutes.delete('/:compraId', deleteCompra);


export default comprasRoutes;
