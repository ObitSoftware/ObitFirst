import express from 'express';
const ventaRoutes = express.Router();

import { 
    crearVenta, 
    eliminarVenta, 
    consultarTodasVentas, 
    consultarVenta, 
    actualizarVenta,
    eliminarVentaReponerStock
 } from '../controllers/ventaController.js';

ventaRoutes.post('/', crearVenta);
ventaRoutes.delete('/:ventaId', eliminarVenta);
ventaRoutes.delete('/reponerStock/:ventaId', eliminarVentaReponerStock);
ventaRoutes.get('/', consultarTodasVentas);
ventaRoutes.get('/:ventaId', consultarVenta);
ventaRoutes.put('/:ventaId', actualizarVenta);


export default ventaRoutes;
