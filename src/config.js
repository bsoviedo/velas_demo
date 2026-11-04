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
  // LISTA DE DISEÑOS & CLASIFICACIÓN
  // ===========================================================================
  // Compatible directamente con GitHub Pages nativo (sin depender de build de Vite)
  // Colores de velas: "Velas Blancas", "Velas Neón", "Velas Pastel"
  // Colores de caja:  "Caja Negra", "Caja Dorada", "Caja Verde", "Caja Roja"
  // Cambia "disponible: true" a "disponible: false" si se agota algún diseño.
  productos: [
    {
      id: '01',
      numero: '01',
      archivo: 'caja-negra_velas-neon_noche-de-velitas.jpg',
      titulo: 'Caja Negra Noche de Velitas',
      colorCaja: 'Caja Negra',
      colorVelas: 'Velas Neón',
      disponible: true,
    },
    {
      id: '02',
      numero: '02',
      archivo: 'caja-dorada_velas-neon_virgen-maria.jpg',
      titulo: 'Caja Dorada Virgen María',
      colorCaja: 'Caja Dorada',
      colorVelas: 'Velas Neón',
      disponible: true,
    },
    {
      id: '03',
      numero: '03',
      archivo: 'caja-dorada_velas-blancas_pesebre-navideno.jpg',
      titulo: 'Caja Dorada Pesebre Navideño',
      colorCaja: 'Caja Dorada',
      colorVelas: 'Velas Blancas',
      disponible: true,
    },
    {
      id: '04',
      numero: '04',
      archivo: 'caja-dorada_velas-blancas_virgen-navidad-1.jpg',
      titulo: 'Caja Dorada Virgen (Rojo y Verde 1)',
      colorCaja: 'Caja Dorada',
      colorVelas: 'Velas Blancas',
      disponible: true,
    },
    {
      id: '05',
      numero: '05',
      archivo: 'caja-dorada_velas-blancas_virgen-navidad-2.jpg',
      titulo: 'Caja Dorada Virgen (Rojo y Verde 2)',
      colorCaja: 'Caja Dorada',
      colorVelas: 'Velas Blancas',
      disponible: true,
    },
    {
      id: '06',
      numero: '06',
      archivo: 'caja-verde_velas-pastel_pesebre-noche-magica-1.jpg',
      titulo: 'Caja Verde Pesebre (Velas Pastel 1)',
      colorCaja: 'Caja Verde',
      colorVelas: 'Velas Pastel',
      disponible: true,
    },
    {
      id: '07',
      numero: '07',
      archivo: 'caja-verde_velas-neon_pesebre-noche-magica.jpg',
      titulo: 'Caja Verde Pesebre (Velas Pastel 3)',
      colorCaja: 'Caja Verde',
      colorVelas: 'Velas Pastel',
      disponible: true,
    },
    {
      id: '08',
      numero: '08',
      archivo: 'caja-roja_velas-pastel_navidad-regalos.jpg',
      titulo: 'Caja Roja Regalos (Velas Pastel)',
      colorCaja: 'Caja Roja',
      colorVelas: 'Velas Pastel',
      disponible: true,
    },
    {
      id: '09',
      numero: '09',
      archivo: 'caja-verde_velas-pastel_pesebre-noche-magica-2.jpg',
      titulo: 'Caja Verde Pesebre (Velas Pastel 2)',
      colorCaja: 'Caja Verde',
      colorVelas: 'Velas Pastel',
      disponible: true,
    },
    {
      id: '10',
      numero: '10',
      archivo: 'caja-roja_velas-neon_navidad-regalos.jpg',
      titulo: 'Caja Roja Regalos (Velas Neón)',
      colorCaja: 'Caja Roja',
      colorVelas: 'Velas Neón',
      disponible: true,
    },
    {
      id: '11',
      numero: '11',
      archivo: 'caja-roja_velas-neon_virgen-maria.jpg',
      titulo: 'Caja Roja Virgen María (Velas Pastel 2)',
      colorCaja: 'Caja Roja',
      colorVelas: 'Velas Neón',
      disponible: true,
    },
    {
      id: '12',
      numero: '12',
      archivo: 'caja-roja_velas-pastel_pesebre-navideno.jpg',
      titulo: 'Caja Roja Pesebre (Velas Pastel)',
      colorCaja: 'Caja Roja',
      colorVelas: 'Velas Pastel',
      disponible: true,
    },
  ]
};
