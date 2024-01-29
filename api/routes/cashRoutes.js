import express from 'express';
const cashRoutes = express.Router();

import  {
   deductCash,
   increaseCash,
   getAvailableCash
} from '../controllers/cashController.js'


cashRoutes.get('/getAvailableCash/:userId', getAvailableCash);
cashRoutes.post('/addCash/:userId');
cashRoutes.put('/deductCash/:userId', deductCash);
cashRoutes.put('/increaseCash/:userId', increaseCash);



export default cashRoutes;