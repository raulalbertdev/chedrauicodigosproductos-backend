// controllers/csv.controller.js
import express from 'express';
import { generarCSVBuffer } from '../services/csvService.js';

const router = express.Router();

router.post('/exportar-csv', async (req, res) => {
  try {
    const { productos } = req.body;

    if (!productos || !Array.isArray(productos)) {
      return res.status(400).json({ error: 'Lista de productos inválida' });
    }

    const csvBuffer = generarCSVBuffer(productos);

    // Preparar respuesta
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=productos.csv');
    res.send(csvBuffer);
  } catch (error) {
    console.error('Error al generar CSV:', error);
    res.status(500).json({ error: 'Error al generar el archivo CSV' });
  }
});

export default router;
