import express from 'express';
const router = express.Router();

import  {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
} from './controller/userController'


// Routes:
router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.put('/:userId', updateUser);
router.post('/', createUser);
router.delete('/:userId', deleteUser);


export default router;