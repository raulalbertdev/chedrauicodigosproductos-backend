// utils/placeholder.js
export function dibujarPlaceholder(doc, x, y) {
    doc.rect(x, y, 100, 100)
       .fill('#f5f5f5')
       .stroke('#DDD');
    doc.fontSize(8).fill('#666')
       .text('Imagen no disponible', x, y + 45, {
         width: 100,
         align: 'center'
       });
  }
  