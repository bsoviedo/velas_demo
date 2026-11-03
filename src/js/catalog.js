// =============================================================================
// CARGA DINÁMICA DE IMÁGENES (SIN QUEMAR NOMBRES)
// =============================================================================
// Vite escanea automáticamente todo archivo en src/velas/ en tiempo de ejecución/build.
// Solo coloca tus fotos en esa carpeta y aparecerán aquí automáticamente.

// Importación glob de Vite:
const imageModules = import.meta.glob('../velas/*.{png,jpg,jpeg,webp,avif,gif,PNG,JPG,JPEG,WEBP,AVIF,GIF}', {
  eager: true,
  import: 'default'
});

/**
 * Convierte un nombre de archivo (ej. "caja-noche-de-velitas.jpg" o "vela_01_virgen.png")
 * en un título estético y legible (ej. "Caja Noche De Velitas").
 */
function formatTitle(filename) {
  // Quitar extensión
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  
  // Reemplazar guiones y guiones bajos por espacios
  const cleanName = nameWithoutExt.replace(/[-_]+/g, ' ').trim();
  
  // Si está vacío o es solo números, poner algo amigable
  if (!cleanName || /^\d+$/.test(cleanName)) {
    return `Diseño #${cleanName || 'Especial'}`;
  }

  // Capitalizar cada palabra (respetando conectores como 'de', 'en', 'la', 'el')
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
 * Retorna la lista organizada de productos/diseños encontrados en la carpeta
 */
export function getCandleProducts() {
  const entries = Object.entries(imageModules);
  
  // Mapear cada entrada
  const products = entries.map(([filepath, url], index) => {
    // Extraer solo el nombre del archivo (ej. "caja-dorada.jpg")
    const filename = filepath.split('/').pop() || `diseno-${index + 1}.jpg`;
    const title = formatTitle(filename);

    return {
      id: `vela-${index + 1}`,
      index,
      filename,
      title,
      url,
    };
  });

  // Ordenar alfabéticamente por título de forma natural
  products.sort((a, b) => a.title.localeCompare(b.title, 'es', { numeric: true }));

  return products;
}
