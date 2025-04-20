import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "u134svlakin@gmail.com",
    pass: "aalogvlutqhedykw"
  }
});

transporter.sendMail({
  from: '"Prueba NodeMailer" <u134svlakin@gmail.com>',
  to: "u134svlakin@gmail.com",
  subject: "📬 Test desde producción",
  text: "¡Hola! Este es un correo de prueba enviado desde tu servidor en DigitalOcean."
}).then(() => {
  console.log("✅ ¡Correo enviado con éxito!");
}).catch(err => {
  console.error("❌ Error al enviar correo:", err);
});
