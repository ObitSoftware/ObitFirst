import Proveedor from '../models/proveedorModel.js';

export const crearProveedor = async (req, res) => {
  const { nombre, telefono } = req.body;

  try {
    const newProveedor = new Proveedor({ nombre, telefono });
    await newProveedor.save();

    res.status(201).json({ message: 'Proveedor creado con éxito', proveedor: newProveedor });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const eliminarProveedor = async (req, res) => {
  const { proveedorId } = req.params;

  try {
    const proveedor = await Proveedor.findById(proveedorId);

    if (!proveedor) {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }

    await Proveedor.findByIdAndRemove(proveedorId);

    res.status(200).json({ message: 'Proveedor eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const consultarTodosProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.find();
    res.status(200).json(proveedores);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const consultarProveedor = async (req, res) => {
  const { proveedorId } = req.params;

  try {
    const proveedor = await Proveedor.findById(proveedorId);

    if (!proveedor) {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }

    res.status(200).json(proveedor);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const actualizarProveedor = async (req, res) => {
  const { providerUniqueId } = req.params;
  const { nombre, telefono } = req.body;

  try {
     Proveedor.findByIdAndUpdate({_id: providerUniqueId}, { 
       nombre: nombre,
       telefono: telefono
     })
     .then((newProvider) => {                                      
            res.status(200).json(newProvider);
          })
          .catch((err) => { 
            res.status(500).json({ error: 'Error interno del servidor' });
            console.log(err)
          })
        } catch (error) {
          console.log(error)
          res.status(500).json({ error: 'Error interno del servidor' });
        }
};

