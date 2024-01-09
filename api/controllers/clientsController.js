import Cliente from "../models/clienteModel.js";



export const getAllClients = async (req, res) => {
    try {
      const clientes = await Cliente.find();
      res.status(200).json(clientes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const getClientData = async (req, res) => {
    const {clientId} = req.params
    try {
      const cliente = await Cliente.find({_id: clientId});
      res.status(200).json(cliente);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

export const saveNewClient = async (req, res) => { 
    try {
        const nuevoCliente = await Cliente.create(req.body);
        res.status(201).json(nuevoCliente);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

export const deleteClient = async (req, res) => {
  const { clientId } = req.params;
  try {
    const clienteEliminado = await Cliente.findByIdAndDelete({_id: clientId});
    if (!clienteEliminado) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    res.status(200).json({ mensaje: 'Cliente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCliente = async (req, res) => {
  const { clientId } = req.params;
  const { nombre, telefono, email, dni } = req.body
  try {
    const clienteActualizado = await Cliente.findByIdAndUpdate(
      {_id: clientId},
      { nombre, telefono, email, dni },
      { new: true }
    );
    if (!clienteActualizado) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    res.status(200).json(clienteActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};