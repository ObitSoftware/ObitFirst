import express from 'express';
const emailRoutes = express.Router();
import { sendEmailToProvider } from '../controllers/emailController.js';

emailRoutes.post('/email', sendEmailToProvider);


export default emailRoutes;
