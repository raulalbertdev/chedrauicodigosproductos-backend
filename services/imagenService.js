// services/imagen.service.js
import axios from 'axios';
import sharp from 'sharp';

export async function descargarImagen(url) {
  try {
    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'arraybuffer',
      headers: {
        'Referer': 'https://www.chedraui.com.mx/',
        'User-Agent': 'Mozilla/5.0'
      }
    });

    const buffer = await sharp(response.data)
      .resize(230, 230, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toBuffer();

    return buffer;
  } catch (error) {
    console.error(`Error al descargar imagen ${url}:`, error.message);
    return null;
  }
}
