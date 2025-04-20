// controllers/producto.controller.js
import express from 'express';

const router = express.Router();

router.post("/registerActivityApp", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const fecha = new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City" });

  const data = {
    ip,
    fecha,
    status: req.body.status || "Actividad desconocida"
  };


  // Logica para registrar en base de datos

  res.json({ mensaje: "Correo encolado para envío asincrónico." });
});

export default router;
