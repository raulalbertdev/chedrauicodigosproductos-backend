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
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: "u134svlakin@gmail.com",
    pass: "aalogvlutqhedykw"
  }
});

const worker = new Worker('correo', async job => {
  const { ip, fecha, status } = job.data;

  console.log("👷‍♂️ Worker ejecutandose...");
  try {
    await transporter.sendMail({
      from: '"Monitor App Chedraui" <u134svlakin@gmail.com>',
      to: 'u134svlakin@gmail.com',
      subject: `🚨 Actividad detectada en la APP`,
      text: `
📅 Fecha y hora: ${fecha}
🌐 IP: ${ip}
📌 Estado: ${status}
      `
    });

    console.log(`📧 Correo enviado correctamente (Job ID: ${job.id})`);
    return true; // <-- asegúrate de que se resuelva
  } catch (err) {
    console.error(`❌ Error al enviar correo (Job ID: ${job.id}):`, err);
    throw err; // <-- así BullMQ lo sabrá como "fallido"
  }
}, {
  connection,
  removeOnComplete: true,
  removeOnFail: false
});
