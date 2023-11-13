import express from 'express';
const router = express.Router();
import {
  crearProveedor,
  eliminarProveedor,
  consultarTodosProveedores,
  consultarProveedor,
  actualizarProveedor
} from '../controllers/proveedorController';

router.post('/', crearProveedor);
router.delete('/:proveedorId', eliminarProveedor);
router.get('/', consultarTodosProveedores);
router.get('/:proveedorId', consultarProveedor);
router.put('/:proveedorId', actualizarProveedor);

export default router;
