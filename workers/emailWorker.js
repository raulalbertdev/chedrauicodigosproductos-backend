// workers/emailWorker.js
import nodemailer from 'nodemailer';
import { Worker } from 'bullmq';
import IORedis from 'ioredis';

// ✅ Configuración explícita de conexión
const connection = new IORedis({
  host: '127.0.0.1', // o tu host Redis
  port: 6379,        // Puerto por defecto
  maxRetriesPerRequest: null, // ⚠️ Esto evita el error que viste
  enableReadyCheck: false     // (opcional, pero recomendado en BullMQ)
});

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
