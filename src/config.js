// =============================================================================
// CONFIGURACIÓN DEL CATÁLOGO & CLASIFICACIÓN DE PRODUCTOS
// =============================================================================

export const CONFIG = {
  // Nombre de la tienda
  brandName: 'Velas Noche de Velitas',

  // Títulos principales
  catalogTitle: 'Colección Noche de Velitas',
  catalogSubtitle: 'Cajitas de edición especial para encender tus mejores intenciones en familia este 7 de diciembre.',

  // Barra superior de anuncio
  topBannerText: '✨ EDICIÓN ESPECIAL 7 DE DICIEMBRE — CATÁLOGO DE DISEÑOS DISPONIBLES',

  // ===========================================================================
  // INVENTARIO Y CLASIFICACIÓN
  // ===========================================================================
  // Colores de velas oficiales: "Velas Blancas", "Velas Neón", "Velas Pastel"
  // Colores de caja oficiales:  "Caja Negra", "Caja Dorada"
  // Para marcar como agotado, cambia "disponible: true" a "disponible: false"
  inventario: {
    'caja-negra_velas-neon_noche-de-velitas.jpg': {
      titulo: 'Caja Negra Noche de Velitas',
      colorCaja: 'Caja Negra',
      colorVelas: 'Velas Neón',
      disponible: true, // <-- Cambia a false si se agota
    },
    'caja-dorada_velas-pastel_virgen-maria.jpg': {
      titulo: 'Caja Dorada Virgen María',
      colorCaja: 'Caja Dorada',
      colorVelas: 'Velas Neón',
      disponible: true, // <-- Cambia a false si se agota
    },
    'caja-dorada_velas-blancas_pesebre-navideno.jpg': {
      titulo: 'Caja Dorada Pesebre Navideño',
      colorCaja: 'Caja Dorada',
      colorVelas: 'Velas Blancas',
      disponible: true, // <-- Cambia a false si se agota
    },
    'caja-dorada_velas-blancas_virgen-navidad-1.jpg': {
      titulo: 'Caja Dorada Virgen (Rojo y Verde 1)',
      colorCaja: 'Caja Dorada',
      colorVelas: 'Velas Blancas',
      disponible: true, // <-- Cambia a false si se agota
    },
    'caja-dorada_velas-blancas_virgen-navidad-2.jpg': {
      titulo: 'Caja Dorada Virgen (Rojo y Verde 2)',
      colorCaja: 'Caja Dorada',
      colorVelas: 'Velas Blancas',
      disponible: true, // <-- Cambia a false si se agota
    },
  }
};
