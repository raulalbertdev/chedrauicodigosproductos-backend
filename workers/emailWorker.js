import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import nodemailer from 'nodemailer';

const connection = new IORedis({
  host: '127.0.0.1',
  port: 6379,
  maxRetriesPerRequest: null,
  enableReadyCheck: false
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "u134svlakin@gmail.com",
    pass: "aalogvlutqhedykw"
  }
});

const worker = new Worker('correo', async job => {
  const { ip, fecha, status } = job.data;

  try {
    await transporter.sendMail({
      from: '"Monitor App Chedraui" <tu-email@gmail.com>',
      to: 'tu-email@gmail.com',
      subject: `🚨 Actividad detectada`,
      text: `
📅 Fecha y hora: ${fecha}
🌐 IP: ${ip}
📌 Estado: ${status}
      `
    });

    console.log('📧 Correo enviado con éxito.');
  } catch (err) {
    console.error('❌ Error al enviar correo:', err.message);
  }
}, { connection });
