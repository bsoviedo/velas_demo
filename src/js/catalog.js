// =============================================================================
// CARGA Y RESOLUCIÓN DE IMÁGENES (100% COMPATIBLE CON GITHUB PAGES Y VITE)
// =============================================================================
import { CONFIG } from '../config.js';

/**
 * Retorna todos los productos clasificados con sus URLs resueltas dinámicamente.
 * Usa "new URL(..., import.meta.url).href", que es el estándar web nativo de JavaScript.
 * Esto garantiza que funcione en cualquier subruta de GitHub Pages (ej. /velas_demo/)
 * y sin requerir compilación obligatoria.
 */
export function getCandleProducts() {
  const lista = CONFIG.productos || [];

  return lista.map((item, index) => {
    // new URL resuelve automáticamente la ruta correcta respecto al archivo catalog.js
    const resolvedUrl = new URL(`../velas/${item.archivo}`, import.meta.url).href;
    const num = item.numero || item.id || String(index + 1).padStart(2, '0');

    return {
      id: `vela-${num}`,
      numero: num,
      index,
      filename: item.archivo,
      title: item.titulo,
      colorCaja: item.colorCaja,
      colorVelas: item.colorVelas,
      disponible: item.disponible !== false,
      url: resolvedUrl,
    };
  });
}
