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
proveedorRoutes.put('/:providerUniqueId', actualizarProveedor);

export default proveedorRoutes;
