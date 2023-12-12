import Categorias from "../models/categoryModel.js";


export const giveMeCategorys = async (req, res) => { 
   
    try { 
      const allTheCategorys = await Categorias.find();
      res.status(200).json(allTheCategorys);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener categorias' });
    }
  }