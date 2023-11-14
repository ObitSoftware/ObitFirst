import express from 'express';
const ventaRoutes = express.Router();

import { 
    crearVenta, 
    eliminarVenta, 
    consultarTodasVentas, 
    consultarVenta, 
    actualizarVenta
 } from '../controllers/ventaController.js';

ventaRoutes.post('/', crearVenta);
ventaRoutes.delete('/:ventaId', eliminarVenta);
ventaRoutes.get('/', consultarTodasVentas);
ventaRoutes.get('/:ventaId', consultarVenta);
ventaRoutes.put('/:ventaId', actualizarVenta);


export default ventaRoutes;
