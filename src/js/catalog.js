// =============================================================================
// CARGA DINÁMICA Y CLASIFICACIÓN DE PRODUCTOS
// =============================================================================
import { CONFIG } from '../config.js';

const imageModules = import.meta.glob('../velas/*.{png,jpg,jpeg,webp,avif,gif,PNG,JPG,JPEG,WEBP,AVIF,GIF}', {
  eager: true,
  import: 'default'
});

/**
 * Convierte un nombre de archivo en un título legible
 */
function formatTitle(filename) {
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  // Quitar prefijos de caja y velas si existen (ej. caja-dorada_velas-blancas_...)
  const parts = nameWithoutExt.split('_');
  const rawTitle = parts.length > 2 ? parts.slice(2).join(' ') : parts.join(' ');
  const cleanName = rawTitle.replace(/[-_]+/g, ' ').trim();

  if (!cleanName || /^\d+$/.test(cleanName)) {
    return `Diseño #${cleanName || 'Especial'}`;
  }

  const lowercaseWords = new Set(['de', 'del', 'la', 'las', 'el', 'los', 'en', 'con', 'y', 'o']);
  return cleanName
    .split(/\s+/)
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (index > 0 && lowercaseWords.has(lower)) {
        return lower;
      }
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(' ');
}

/**
 * Detecta automáticamente atributos a partir del nombre del archivo si no está en inventario
 */
function autoDetectAttributes(filename) {
  const lower = filename.toLowerCase();

  // Color de caja
  let colorCaja = 'Caja Dorada';
  if (lower.includes('negra')) {
    colorCaja = 'Caja Negra';
  } else if (lower.includes('blanca')) {
    colorCaja = 'Caja Blanca';
  }

  // Color de velas: "Velas Blancas", "Velas Neón", "Velas Pastel"
  let colorVelas = 'Velas Blancas';
  if (lower.includes('neon') || lower.includes('neón')) {
    colorVelas = 'Velas Neón';
  } else if (lower.includes('pastel')) {
    colorVelas = 'Velas Pastel';
  } else if (lower.includes('blanca')) {
    colorVelas = 'Velas Blancas';
  }

  return { colorCaja, colorVelas };
}

/**
 * Retorna todos los productos clasificados con su estado de disponibilidad
 */
export function getCandleProducts() {
  const entries = Object.entries(imageModules);
  const inventario = CONFIG.inventario || {};

  const products = entries.map(([filepath, url], index) => {
    const filename = filepath.split('/').pop() || `diseno-${index + 1}.jpg`;
    
    // Si está en el inventario de config.js, tomar esos datos
    const customData = inventario[filename];

    const detected = autoDetectAttributes(filename);
    const title = customData?.titulo || formatTitle(filename);
    const colorCaja = customData?.colorCaja || detected.colorCaja;
    const colorVelas = customData?.colorVelas || detected.colorVelas;
    const disponible = customData?.disponible !== undefined ? customData.disponible : true;

    return {
      id: `vela-${index + 1}`,
      index,
      filename,
      title,
      colorCaja,
      colorVelas,
      disponible,
      url,
    };
  });

  // Ordenar alfabéticamente por título
  products.sort((a, b) => a.title.localeCompare(b.title, 'es', { numeric: true }));

  return products;
}
