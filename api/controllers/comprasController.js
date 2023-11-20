import Compra from '../models/compraModel.js';


// Obtener todas las compras
export const getAllCompras = async (req, res) => {
  try {
    const compras = await Compra.find();
    res.status(200).json(compras);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la informacion de las compras' });
  }
}

// Obtener una compra por su ID
export const getCompraById = async (req, res) => {
  const {compraId} = req.params
  try {
    const compra = await Compra.findById({_id: compraId})
    if (!compra) {
      return res.status(404).json({ message: 'Compra no encontrada, compruebe el Id' });
    }
    res.status(200).json(compra);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la informacion de la compra' });
  }
};

// Crear un nuevo compra


export const createCompra = async (req, res) => { 
  const {compraId, productosComprados, fechaCompra, total} = req.body
  console.log(req.body)

      try {
        const newCompraToSaved = new Compra({ 
          compraId,
          fechaCompra,
          total,
          productosComprados,   
        })
        newCompraToSaved.save()
                        .then((nuevaCompra) => { 
                          res.json({message: "Compra guardada", nuevaCompra})
                        })
                        .catch((err) => { 
                          console.log(err)
                        })
      } catch (error) {
        console.log(err)
      }
}

//Actualizar Compra
export const updateCompra = async (req, res) => {
  const { compraId } = req.params;
  const { productosComprados, total}  = req.body

  try {
        Compra.findByIdAndUpdate({ _id: compraId }, { 
            productosComprados, total
          })
          .then((newCompra) => {                                      
          res.json({message:"Informacion de la compra actualizada", newCompra})
          })
          .catch((err) => { 
          console.log(err)
          })

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Eliminar una compra
export const deleteCompra = async (req, res) => {
  const { compraId } = req.params;

  try {
    const deletedCompra = await Compra.findByIdAndDelete(compraId);

    if (deletedCompra) {
      res.status(200).json({ message: 'Compra eliminada correctamente', deleted: deletedCompra });
    } else {
      res.status(404).json({ message: 'Compra no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};


