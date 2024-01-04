import nodemailer from 'nodemailer';
import Email from '../models/emailModel.js';

export const sendEmailToProvider = async (req, res) => { 
    try {
        const { addressee, message, type, date } = req.body;
        console.log(req.body);

        const newEmailToBeSaved = new Email(req.body);
        const savedEmail = await newEmailToBeSaved.save();
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'obitsoftware@gmail.com', 
            pass: 'jghl xhdk bqju xtpj' 
          },
          tls: {
            rejectUnauthorized: false
          }
         });
           
        const mailOptions = {
          from: 'obitsoftware@gmail.com', 
          to: addressee, 
          subject: 'Asunto del correo',
          text: message 
        };
    
        await transporter.sendMail(mailOptions);

     
        
        res.status(200).json({ mensaje: 'Correo electrónico enviado y almacenado con éxito', savedEmail });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al enviar el correo electrónico' });
    }
};

export const getEmails = async (req, res) => { 
  try {
    const emails = await Email.find();
    res.status(200).json(emails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};