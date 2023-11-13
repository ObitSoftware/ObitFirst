import express from 'express';
const router = express.Router();

import { 
    crearVenta, 
    eliminarVenta, 
    consultarTodasVentas, 
    consultarVenta, 
    actualizarVenta
 } from '../controllers/ventaController';

router.post('/', crearVenta);
router.delete('/:ventaId', eliminarVenta);
router.get('/', consultarTodasVentas);
router.get('/:ventaId', consultarVenta);
router.put('/:ventaId', actualizarVenta);


export default router;
