// controllers/producto.controller.js
import express from 'express';
import fetch from 'node-fetch';
import { emailQueue } from './../queues/emailQueue.js';

const router = express.Router();

router.get("/registerActivityApp", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const fecha = new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City" });

  const data = {
    ip,
    fecha,
    status: req.body.status || "Actividad desconocida"
  };

  // Encolar tarea sin bloquear
  await emailQueue.add("notificacion", data, {
    attempts: 3,
    backoff: { type: 'exponential', delay: 5000 }
  });

  res.json({ mensaje: "Correo encolado para envío asincrónico." });
});

export default router;
