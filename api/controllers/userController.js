import User from '../models/userModel';


async function createUser(req, res) {
    try {
      const newUser = new User(req.body);
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el usuario' });
    }
  }
// Obtener todos los productos
async function getAllUsers(req, res) {
    try {
      const products = await User.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
  }
  
  // Obtener un producto por su ID
  async function getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el usuario' });
    }
  }
  
  
  
  // Actualizar un producto existente
  async function updateUser(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
  }
  async function deleteUser(req, res) {
    try {
      const deletedUser = await  User.findByIdAndRemove(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: ' Usuario no encontrado' });
      }
      res.status(200).json({ message: ' Usuario eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el  Usuario' });
    }
  }

module.exports = {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser
}