// =============================================================================
// MAIN APP - CATÁLOGO DE VELAS
// =============================================================================
import { CONFIG } from './config.js';
import { getCandleProducts } from './js/catalog.js';
import { Lightbox } from './js/lightbox.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Cargar productos dinámicos desde src/velas/
  const allProducts = getCandleProducts();
  let currentProducts = [...allProducts];

  // 2. Inicializar Lightbox interactivo
  const lightbox = new Lightbox(allProducts);

  // 3. Vincular textos de configuración a la interfaz
  applyConfig();

  // 4. Renderizar catálogo
  renderCatalog(currentProducts, lightbox);

  // 5. Configurar buscador en tiempo real
  setupSearch(allProducts, lightbox);

  // 6. Verificar si hay un diseño específico en la URL (ej. #vela-1)
  checkUrlHash(allProducts, lightbox);
});

/**
 * Aplica los datos de CONFIG al DOM
 */
function applyConfig() {
  const topAnnouncement = document.getElementById('top-announcement');
  const catalogTitle = document.getElementById('catalog-title');
  const catalogSubtitle = document.getElementById('catalog-subtitle');
  const footerBrand = document.getElementById('footer-brand');
  const floatingWhatsapp = document.getElementById('floating-whatsapp');

  if (topAnnouncement && CONFIG.topBannerText) {
    topAnnouncement.textContent = CONFIG.topBannerText;
  }
  if (catalogTitle && CONFIG.catalogTitle) {
    catalogTitle.textContent = CONFIG.catalogTitle;
  }
  if (catalogSubtitle && CONFIG.catalogSubtitle) {
    catalogSubtitle.textContent = CONFIG.catalogSubtitle;
  }
  if (footerBrand && CONFIG.brandName) {
    footerBrand.textContent = CONFIG.brandName;
  }

  // Configurar enlace general de WhatsApp
  if (floatingWhatsapp && CONFIG.whatsappNumber) {
    const generalMsg = encodeURIComponent(CONFIG.whatsappGeneralMessage);
    floatingWhatsapp.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${generalMsg}`;
  }
}

/**
 * Renderiza la grilla de productos
 */
function renderCatalog(products, lightbox) {
  const grid = document.getElementById('catalog-grid');
  const countNumber = document.getElementById('count-number');
  if (!grid) return;

  // Actualizar contador
  if (countNumber) {
    countNumber.textContent = products.length;
  }

  // Si no hay productos
  if (products.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🕯️</div>
        <h3>No se encontraron diseños</h3>
        <p>Intenta con otra palabra clave o limpia el buscador para ver todos los diseños disponibles.</p>
      </div>
    `;
    return;
  }

  // Generar HTML de cada tarjeta
  grid.innerHTML = products.map((item) => {
    // Generar enlace de WhatsApp para este producto
    const orderMsg = encodeURIComponent(CONFIG.whatsappOrderMessage.replace('{nombre}', item.title));
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${orderMsg}`;

    return `
      <article class="candle-card" data-id="${item.id}" data-index="${item.index}">
        <div class="card-image-container" data-action="open-zoom" title="Haz clic para ampliar con zoom">
          <span class="card-badge">Diseño Disponible</span>
          <img 
            class="card-img" 
            src="${item.url}" 
            alt="${item.title}" 
            loading="lazy"
          />
          <div class="image-zoom-overlay">
            <span class="zoom-hint-pill">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
              Ver Detalle / Zoom
            </span>
          </div>
        </div>

        <div class="card-body">
          <div>
            <h2 class="card-title">${item.title}</h2>
            <p class="card-desc">Cajita con 8 velas marcadas con deseos para la Noche de Velitas.</p>
          </div>

          <div class="card-actions">
            <button class="btn btn-zoom" data-action="open-zoom" title="Ver con lupa y pantalla completa">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              Zoom
            </button>

            <a 
              href="${whatsappUrl}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn btn-whatsapp-order" 
              title="Pedir este diseño directamente por WhatsApp"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 2C6.5 2 2 6.502 2 12.036c0 1.99.585 3.844 1.597 5.41L2 22l4.747-1.547a9.98 9.98 0 0 0 5.284 1.583h.004c5.53 0 10.03-4.502 10.03-10.036C22.065 6.502 17.562 2 12.031 2zm5.856 14.237c-.247.69-1.229 1.282-1.74 1.341-.475.056-1.077.08-3.488-.916-2.92-1.207-4.81-4.223-4.957-4.417-.145-.195-1.184-1.574-1.184-2.999s.754-2.124 1.022-2.414c.269-.29.587-.363.784-.363.196 0 .393.003.564.012.181.01.424-.069.664.508.247.59.843 2.057.917 2.207.073.15.122.327.024.521-.097.195-.146.316-.293.488-.146.173-.309.387-.44.52-.147.147-.3.308-.13.6.17.292.753 1.242 1.616 2.012 1.111.99 2.049 1.296 2.341 1.442.292.146.463.122.634-.074.17-.194.731-.852.926-1.144.195-.292.39-.244.657-.146.269.098 1.688.796 1.98 1.442.049.122.073.244.073.341 0 .268-.073.707-.32 1.397z"/>
              </svg>
              Pedir
            </a>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Event listeners para abrir el zoom
  grid.querySelectorAll('[data-action="open-zoom"]').forEach((elem) => {
    elem.addEventListener('click', (e) => {
      const card = e.target.closest('.candle-card');
      if (card) {
        const index = parseInt(card.dataset.index, 10);
        lightbox.open(index);
      }
    });
  });
}

/**
 * Filtro de búsqueda en tiempo real
 */
function setupSearch(allProducts, lightbox) {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      renderCatalog(allProducts, lightbox);
      return;
    }

    const filtered = allProducts.filter((item) => {
      return item.title.toLowerCase().includes(query) || item.filename.toLowerCase().includes(query);
    });

    renderCatalog(filtered, lightbox);
  });
}

/**
 * Si la URL contiene un hash como #vela-1 o #caja-dorada, abrir ese diseño
 */
function checkUrlHash(allProducts, lightbox) {
  const hash = window.location.hash.replace('#', '');
  if (!hash) return;

  const foundIndex = allProducts.findIndex(
    (item) => item.id === hash || item.filename.includes(hash)
  );

  if (foundIndex !== -1) {
    setTimeout(() => {
      lightbox.open(foundIndex);
    }, 200);
  }
}
