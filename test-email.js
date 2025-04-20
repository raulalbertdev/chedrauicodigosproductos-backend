import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: true, // TLS
  auth: {
    user: 'u134svlakin@gmail.com',
    pass: 'aalo gvlu tqhe dykw'
  }
});

transporter.sendMail({
  from: '"Prueba" <u134svlakin@gmail.com>',
  to: 'u134svlakin@gmail.com',
  subject: 'Correo de prueba SMTP',
  text: 'Si ves este correo, todo funciona 🔥'
}).then(() => {
  console.log('✅ Correo enviado');
}).catch(err => {
  console.error('❌ Error:', err);
});