import Venta from '../models/ventaModel.js';
import Product from '../models/productModel.js';



const decrementarStock = async (productoId, cantidad) => {
  try {
    await Product.findByIdAndUpdate(
      productoId,
      { $inc: { stock: -cantidad } } 
    );
  } catch (error) {
    console.log(error);
    throw new Error('Error al decrementar el stock del producto');
  }
};

const incrementarStock = async (productoId, cantidad) => {
  try {
    await Product.findByIdAndUpdate(
      productoId,
      { $inc: { stock: cantidad } } // Incrementar el stock según la cantidad originalmente vendida
    );
  } catch (error) {
    console.log(error);
    throw new Error('Error al incrementar el stock del producto');
  }
};



export const crearVenta = async (req, res) => {
  const { idProducto,
  
    nombreProducto,
    categoriaProducto,
    proveedorProducto,
    nombreCliente,
    precio,
    cantidad,
    total,
    gananciaNeta,
    fechaCreacion  } = req.body;

    console.log(req.body)

  try {
    const product = await Product.findById({_id: idProducto});
    console.log(product)

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    if (product.stock < cantidad) {
      return res.status(400).json({ error: 'Stock insuficiente' });
    }

    const total = product.precio * cantidad;

        const newSale = new Venta({ 
          idProducto,
          nombreProducto,
          categoriaProducto,
          proveedorProducto,
          nombreCliente,
          precio,
          cantidad,
          total,
          gananciaNeta,
          fechaCreacion,
         });
                          await newSale.save()
                                       .then((nuevaVenta) => { 
                                        decrementarStock(idProducto, cantidad)
                                        res.status(201).json({ message: 'Venta realizada con éxito', nuevaVenta});
                                       })
                                       .catch((err) => { 
                                        console.log(err)
                                        })

                                    

        } catch (error) {
          res.status(500).json({ error: 'Error interno del servidor' });
        }
};


export const eliminarVenta = async (req, res) => {
  const { ventaId } = req.params;

  try {
    const deletedSell = await Venta.findByIdAndDelete({_id: ventaId});

    if (deletedSell) {
      res.status(200).json({ message: 'Venta eliminado correctamente', deleted: deletedSell });
    } else {
      res.status(404).json({ message: 'Venta no eliminada' });
    }

  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};



export const eliminarVentaReponerStock = async (req, res) => {
  const { ventaId } = req.params;

  try {
    const venta = await Venta.findById(ventaId);
    if (!venta) {
      return res.status(404).json({ mensaje: 'Venta no encontrada' });
    }
    await Product.findByIdAndUpdate(
      venta.idProducto,
      { $inc: { stock: venta.cantidad } }, 
      { new: true }
    );
    await Venta.findByIdAndDelete(ventaId);
    res.status(200).json({ mensaje: 'Venta eliminada y stock repuesto' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al procesar la solicitud' });
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
    const {
      nombreProducto,
      nombreCliente,
      precio,
      cantidad,
      total,
      fechaCreacion } = req.body;

      try {
        Venta.findByIdAndUpdate({_id: ventaId}, { 
          nombreProducto: nombreProducto,
          nombreCliente: nombreCliente,
          precio: precio,
          cantidad: cantidad,
          total: total,
          fechaCreacion: fechaCreacion

        })
        .then((sellEdited) => {                                      
               res.status(200).json(sellEdited);
             })
             .catch((err) => { 
               res.status(500).json({ error: 'Error al editar venta' });
               console.log(err)
             })
           } catch (error) {
             console.log(error)
             res.status(500).json({ error: 'Error interno del servidor' });
           }
    
};

