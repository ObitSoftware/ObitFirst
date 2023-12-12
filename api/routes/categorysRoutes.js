import express from 'express';
const categorysRoutes = express.Router();
import {giveMeCategorys} from '../controllers/categorysController.js';


categorysRoutes.get('/getAllCategorys', giveMeCategorys);

export default categorysRoutes;