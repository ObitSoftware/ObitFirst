import express from 'express';
const cashRoutes = express.Router();

import  {
   deductCash,
   increaseCash,
   addNewMovement,
   getAvailableCash,
} from '../controllers/cashController.js'


cashRoutes.get('/getAvailableCash/:userId', getAvailableCash);
cashRoutes.post('/addNewMovement/:userId', addNewMovement);
cashRoutes.post('/addCash/:userId');
cashRoutes.put('/deductCash/:userId', deductCash);
cashRoutes.put('/increaseCash/:userId', increaseCash);



export default cashRoutes;