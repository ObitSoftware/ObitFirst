import express from 'express';
const userRoutes = express.Router();

import  {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    login,

} from '../controllers/userController.js'


// Routes:
userRoutes.get('/', getAllUsers);
userRoutes.get('/:userId', getUserById);
userRoutes.put('/:userId', updateUser);
userRoutes.post('/', createUser);
userRoutes.post("/login", login)
userRoutes.delete('/:userId', deleteUser);


export default userRoutes;