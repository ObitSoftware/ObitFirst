import express from 'express';
const emailRoutes = express.Router();
import { sendEmailToProvider, getEmails, deleteEmail } from '../controllers/emailController.js';

emailRoutes.post('/email', sendEmailToProvider);
emailRoutes.get('/email', getEmails);
emailRoutes.delete('/email/:emailId', deleteEmail);



export default emailRoutes;
