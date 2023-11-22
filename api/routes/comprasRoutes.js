import express from 'express';
const comprasRoutes = express.Router();

import {getAllCompras, getCompraById, createCompra, updateCompra, deleteCompra, deleteCompraAndReplenishStock} from '../controllers/comprasController.js';




// COMPRA

comprasRoutes.get('/', getAllCompras);
comprasRoutes.get('/:comprasId', getCompraById);
comprasRoutes.post('/', createCompra);
comprasRoutes.put('/:comprasId', updateCompra);
comprasRoutes.delete('/:compraId', deleteCompra);
comprasRoutes.delete('/reponerStock/:compraId', deleteCompraAndReplenishStock);


export default comprasRoutes;
