import express from 'express';
import prisma from '../lib/prisma.js';

const router = express.Router();

router.post("/registerActivityApp", async (req, res) => {
  const ip = req.headers["x-forwarded-for"]?.split(',')[0].trim() || req.socket.remoteAddress;
  const fecha = new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City" });


  try {
    const nuevoRegistro = await prisma.registroActividad.create({
      data: {
        ip,
        fecha,
        status: req.body.status || "Actividad desconocida"
      }
    });

    res.json({ mensaje: 'Registro guardado correctamente.', data: nuevoRegistro });
  } catch (error) {
    console.error('❌ Error al guardar registro:', error.message);
    res.status(500).json({ error: 'Error al guardar registro.' });
  }

});


export default router;
