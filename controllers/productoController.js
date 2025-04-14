// controllers/producto.controller.js
import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.get("/producto/:id", async (req, res) => {
  const productId = req.params.id;
  const url = `https://www.chedraui.com.mx/api/catalog_system/pub/products/search?fq=productId:${productId}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error en la API de Chedraui: ${response.status}`);
    }
    const data = await response.json();
    return res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
