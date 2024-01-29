import Cash from "../models/cashModel.js";

export const deductCash = async (req, res) => {
  const { userId } = req.params;
  const { totalToRest } = req.body;

  try {
    const user = await Cash.findOne({ userId: userId });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const updatedCashRegister = user.amount - totalToRest;

    const updatedUser = await Cash.findOneAndUpdate(
      { userId: userId },
      { amount: updatedCashRegister },
      { new: true }
    );

    res.json({ message: 'Usuario Modificado', updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
  
export const increaseCash = async (req, res) => { 
    const { userId } = req.params;
    const { amount } = req.body;

  try {
    const user = await Cash.findOne({ userId: userId });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const updatedCashRegister = user.amount + amount;

    const updatedUser = await Cash.findOneAndUpdate(
      { userId: userId },
      { amount: updatedCashRegister },
      { new: true }
    );

    res.json({ message: 'Usuario Modificado', updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

export const getAvailableCash = async (req, res) => { 

  const { userId } = req.params;

  try {
    const user = await Cash.findOne({ userId: userId });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
}

export const addNewMovement = async (req, res) => { 
  const { userId } = req.params;
  console.log(req.body)

  try {
    const user = await Cash.findOne({ userId: userId });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.lastMovements.push(req.body);
    const updatedUser = await user.save();

    res.json({ message: 'Usuario Modificado', updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};