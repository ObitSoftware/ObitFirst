import Venta from '../models/ventaModel.js';
import Product from '../models/productModel.js';
import { decrementarStock, incrementarStock } from '../helpers/ventaHelp.js';

export const crearVenta = async (req, res) => {
  const { productoId, cantidad } = req.body;

  try {
    const product = await Product.findById(productoId);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    if (product.stock < cantidad) {
      return res.status(400).json({ error: 'Stock insuficiente' });
    }

    const total = product.precio * cantidad;

    const newSale = new Venta({ productoId, cantidad, total });
    await newSale.save();

    await decrementarStock(productoId, cantidad);

    res.status(201).json({ message: 'Venta realizada con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const eliminarVenta = async (req, res) => {
  const { ventaId } = req.params;

  try {
    const sale = await Venta.findById(ventaId);

    if (!sale) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }

    const { productoId, cantidad } = sale;
    await incrementarStock(productoId, cantidad);

    await Venta.findByIdAndRemove(ventaId);

    res.status(200).json({ message: 'Venta eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const consultarTodasVentas = async (req, res) => {
    try {
      const ventas = await Venta.find();
      res.status(200).json(ventas);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
};
  
export const consultarVenta = async (req, res) => {
    const { ventaId } = req.params;
  
    try {
      const venta = await Venta.findById(ventaId);
  
      if (!venta) {
        return res.status(404).json({ error: 'Venta no encontrada' });
      }
  
      res.status(200).json(venta);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
};
  
export const actualizarVenta = async (req, res) => {
    const { ventaId } = req.params;
    const { productoId, cantidad } = req.body;
  
    try {
      const venta = await Venta.findByIdAndUpdate(
        ventaId,
        { productoId, cantidad },
        { new: true }
      );
  
      if (!venta) {
        return res.status(404).json({ error: 'Venta no encontrada' });
      }
  
      res.status(200).json(venta);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
};

