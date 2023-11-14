import express from 'express';
const proveedorRoutes = express.Router();
import {
  crearProveedor,
  eliminarProveedor,
  consultarTodosProveedores,
  consultarProveedor,
  actualizarProveedor
} from '../controllers/proveedorController.js';

proveedorRoutes.post('/', crearProveedor);
proveedorRoutes.delete('/:proveedorId', eliminarProveedor);
proveedorRoutes.get('/', consultarTodosProveedores);
proveedorRoutes.get('/:proveedorId', consultarProveedor);
proveedorRoutes.put('/:proveedorId', actualizarProveedor);

export default proveedorRoutes;
