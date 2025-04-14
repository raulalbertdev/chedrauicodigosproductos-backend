// services/csv.service.js
export function generarCSVBuffer(productos) {
    const filas = [];
  
    // Cabecera
  filas.push('Nombre del producto,Códigos EAN,URL Imagen');

  for (const producto of productos) {
      const nombre = `"${producto.productName.replace(/"/g, '""')}"`; // Escapar comillas
      const codigos = producto.ProductMultiEan.join('|');
      /* const imagen = producto.imageUrl || '';  */

      /* filas.push(`${nombre},${codigos},${imagen}`); */
      filas.push(`${nombre},${codigos}`);
  }

  
    // Unir líneas y convertir a Buffer
    /* const contenido = filas.join('\n'); */
    const contenido = '\uFEFF' + filas.join('\n');
    return Buffer.from(contenido, 'utf-8');
  }
  