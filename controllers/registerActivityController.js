// controllers/producto.controller.js
import express from 'express';

const router = express.Router();

router.post("/registerActivityApp", async (req, res) => {
  console.log('x-forwarded-for:', req.headers['x-forwarded-for']);
  console.log('remoteAddress:', req.socket.remoteAddress);

  const ip = req.headers["x-forwarded-for"]?.split(',')[0].trim() || req.socket.remoteAddress;
  const fecha = new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City" });

  const data = {
    ip,
    fecha,
    status: req.body.status || "Actividad desconocida"
  };

  res.json({ mensaje: "Informe de registro de actividad", data });
});

export default router;
