// controllers/pdf.controller.js
import express from 'express';
import PDFDocument from 'pdfkit';
import { descargarImagen } from '../services/imagenService.js';
import { dibujarPlaceholder } from '../utils/placeholder.js';

const router = express.Router();

router.post('/generar-pdf', async (req, res) => {
  try {
    const { productos } = req.body;

    if (!productos || !Array.isArray(productos)) {
      return res.status(400).json({ error: "Datos de productos no válidos" });
    }

    const doc = new PDFDocument({ margin: 12, size: 'A4', bufferPages: true });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=productos-chedraui.pdf');
    doc.pipe(res);

    const margin = 10;
    const cardWidth = 170;
    const cardHeight = 267;
    const contenidoAncho = (3 * cardWidth) + (2 * margin);
    const margenIzquierdo = (doc.page.width - contenidoAncho) / 2;
    let x, y = 10;

    for (let i = 0; i < productos.length; i++) {
      const producto = productos[i];

      if (i > 0 && i % 9 === 0) {
        doc.addPage();
        y = 10;
      }

      const col = i % 3;
      const row = Math.floor((i % 9) / 3);
      x = margenIzquierdo + col * (cardWidth + margin);
      y = 10 + row * (cardHeight + margin);

      doc.rect(x, y, cardWidth, cardHeight)
         .fillOpacity(0.1)
         .fillAndStroke('#3498db', '#000000')
         .fillOpacity(1);

      // Imagen
      if (producto.imageUrl) {
        const buffer = await descargarImagen(producto.imageUrl);
        if (buffer) {
          const imgX = x + (cardWidth - 100) / 2;
          doc.image(buffer, imgX, y + 10, { width: 100, height: 100, fit: [100, 100] });
        } else {
          dibujarPlaceholder(doc, x + (cardWidth - 100) / 2, y + 10);
        }
      } else {
        dibujarPlaceholder(doc, x + (cardWidth - 100) / 2, y + 10);
      }

      // Nombre del producto
      doc.fontSize(8).font('Helvetica-Bold').fillColor('#000')
         .text(producto.productName, x + 10, y + 120, {
           width: cardWidth - 20,
           align: 'center',
           ellipsis: true
         });

      // EAN
      const eanStartY = producto.productName.length <= 36 ? y + 138 : y + 150;
      const sliceLimit = producto.productName.length <= 36 ? 12 : 11;

      doc.fontSize(8).font('Helvetica').text('Códigos EAN:', x + 10, eanStartY);
      producto.ProductMultiEan.slice(0, sliceLimit).forEach((ean, idx) => {
        const offset = eanStartY + 12 + (idx * 9);
        doc.fontSize(8).text(`• ${ean}`, x + 15, offset);
      });

      if (producto.ProductMultiEan.length > sliceLimit) {
        doc.fontSize(6).text(`******** +${producto.ProductMultiEan.length - sliceLimit} más...`, x + 15, y + 250);
      }
    }

    doc.end();
  } catch (error) {
    console.error("Error al generar PDF:", error);
    res.status(500).json({ error: "Error al generar el PDF" });
  }
});

export default router;
