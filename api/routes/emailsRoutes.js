import express from 'express';
const emailRoutes = express.Router();
import { sendEmailToProvider, getEmails } from '../controllers/emailController.js';

emailRoutes.post('/email', sendEmailToProvider);
emailRoutes.get('/email', getEmails);


export default emailRoutes;
