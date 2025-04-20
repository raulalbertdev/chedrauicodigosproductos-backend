// workers/emailWorker.js
import { Worker } from 'bullmq';
import nodemailer from 'nodemailer';
import IORedis from 'ioredis';

const connection = new IORedis();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "u134svlakin@gmail.com",
    pass: "aalogvlutqhedykw"
  }
});

const emailWorker = new Worker("correo", async job => {
  const { ip, fecha, status } = job.data;

  const mensaje = `
📍 Nueva actividad detectada:

📅 Fecha y hora: ${fecha}
🌐 IP: ${ip}
`;

  await transporter.sendMail({
    from: '"Monitor Chedraui" <raulalbertdev@gmail.com>',
    to: "u134svlakin@gmail.com",
    subject: `🚨 ${status}`,
    text: mensaje
  });

  console.log("📧 Correo enviado desde worker:", ip);
}, { connection });
