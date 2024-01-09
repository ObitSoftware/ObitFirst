import nodemailer from 'nodemailer';
import Email from '../models/emailModel.js';

export const sendEmailToProvider = async (req, res) => { 
    try {
        const { addressee, message, type, date, hour, title } = req.body;
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
          subject: title, 
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


export const deleteEmail = async (req, res) => {
  const { emailId } = req.params;
  try {
    const deletedEmail = await Email.findByIdAndDelete({_id: emailId});
    if (!deletedEmail) {
      return res.status(404).json({ mensaje: 'Email no encontrado' });
    }
    res.status(200).json({ mensaje: 'Email eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};