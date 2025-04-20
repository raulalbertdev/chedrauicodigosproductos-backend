// services/emailService.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "u134svlakin@gmail.com",
    pass: "aalogvlutqhedykw" // tu contraseña de aplicación
  }
});

export async function enviarNotificacion({ ip, status }) {
  const fecha = new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City" });

  const mensaje = `
📍 Nueva actividad detectada:

📅 Fecha y hora: ${fecha}
🌐 IP: ${ip}
`;

  try {
    await transporter.sendMail({
      from: '"Monitoreo App Chedraui" <raulalbertdev@gmail.com>',
      to: "u134svlakin@gmail.com",
      subject: `🚨 ${status}`,
      text: mensaje
    });

    console.log("📧 Correo de notificación enviado correctamente.");
    return { success: true };
  } catch (err) {
    console.error("❌ Error al enviar correo:", err);
    return { success: false, error: err };
  }
}
