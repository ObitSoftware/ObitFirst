import ProdCompra from '../models/prodCompraModel.js';

// Crear un nuevo compra
export const createProdCompra = async (req, res) => {
 
  const {prodCompraId, proveedorId, productoId, precioProducto, fechaPago, observacionesCompra, cantidad, total} = req.body
  console.log(req.body)

  try {
    const newProdCompra = new ProdCompra(req.body);
    const savedProdCompra = await newProdCompra.save();
    res.status(201).json(savedProdCompra);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la compra' });
    console.log(error)
  }
};


// Eliminar una compra
export const deleteProdCompra = async (req, res) => {
  const { prodCompraId } = req.params;

  try {
    const deletedProdCompra = await ProdCompra.findByIdAndDelete(prodCompraId);

    if (deletedProdCompra) {
      res.status(200).json({ message: 'Producto eliminado de la compra correctamente', deleted: deletedProdCompra });
    } else {
      res.status(404).json({ message: 'Prod no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};


