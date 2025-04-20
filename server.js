// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import productoRoutes from "./controllers/productoController.js";
import { enviarNotificacion } from "./services/emailService.js";
import pdfRoutes from "./controllers/pdfController.js";
import csvRoutes from './controllers/csvController.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.get("/", (req, res) => {
  /* res.send("¡Servidor funcionando! 🚀 Prueba /producto/:id o POST a /generar-pdf"); */
  res.redirect('https://www.chedraui.com.mx/');
});

app.post("/identifyApp", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const status = req.body.status || "Actividad desconocida";

  const resultado = await enviarNotificacion({ ip, status });

  if (resultado.success) {
    console.log("Datos recibidos y correo enviado.")
  } else {
    console.log("No se pudo enviar el correo")
  }
});

app.use(productoRoutes);
app.use(pdfRoutes);

app.use(csvRoutes);


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
