// =============================================================================
// MAIN APP - TIENDA ONLINE ESTILO SHOPIFY
// =============================================================================
import { CONFIG } from './config.js';
import { getCandleProducts } from './js/catalog.js';
import { Lightbox } from './js/lightbox.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Cargar dinámicamente imágenes desde src/velas/
  const allProducts = getCandleProducts();
  let currentProducts = [...allProducts];

  // 2. Inicializar Modal de Vista Rápida / Zoom
  const lightbox = new Lightbox(allProducts);

  // 3. Aplicar configuración al DOM
  applyConfig();

  // 4. Renderizar tarjetas de producto estilo Shopify
  renderStoreProducts(currentProducts, lightbox);

  // 5. Configurar buscador en vivo
  setupSearch(allProducts, lightbox);

  // 6. Verificar hash en la URL
  checkUrlHash(allProducts, lightbox);
});

/**
 * Vincula los textos y enlaces de CONFIG a los elementos de la interfaz
 */
function applyConfig() {
  const announcementBar = document.getElementById('announcement-bar');
  const brandName = document.getElementById('brand-name');
  const footerBrand = document.getElementById('footer-brand-name');
  const collectionTitle = document.getElementById('collection-title');
  const collectionDesc = document.getElementById('collection-description');
  const headerWhatsapp = document.getElementById('header-whatsapp-pill');
  const floatingWhatsapp = document.getElementById('floating-whatsapp');

  if (announcementBar && CONFIG.topBannerText) {
    announcementBar.textContent = CONFIG.topBannerText;
  }
  if (brandName && CONFIG.brandName) {
    brandName.textContent = CONFIG.brandName;
  }
  if (footerBrand && CONFIG.brandName) {
    footerBrand.textContent = CONFIG.brandName;
  }
  if (collectionTitle && CONFIG.catalogTitle) {
    collectionTitle.textContent = CONFIG.catalogTitle;
  }
  if (collectionDesc && CONFIG.catalogSubtitle) {
    collectionDesc.textContent = CONFIG.catalogSubtitle;
  }

  // Enlaces de WhatsApp
  const generalMsg = encodeURIComponent(CONFIG.whatsappGeneralMessage);
  const generalUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${generalMsg}`;

  if (headerWhatsapp && CONFIG.whatsappNumber) {
    headerWhatsapp.href = generalUrl;
  }
  if (floatingWhatsapp && CONFIG.whatsappNumber) {
    floatingWhatsapp.href = generalUrl;
  }
}

/**
 * Renderiza los productos en grilla con diseño de tarjeta de tienda online (Shopify)
 */
function renderStoreProducts(products, lightbox) {
  const grid = document.getElementById('product-grid');
  const countPill = document.getElementById('products-count');
  if (!grid) return;

  if (countPill) {
    countPill.textContent = `${products.length} ${products.length === 1 ? 'diseño' : 'diseños'}`;
  }

  if (products.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: #ffffff; border-radius: 12px; border: 1px dashed #d1d5db;">
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🕯️</div>
        <h3 style="font-size: 1.25rem; font-weight: 700; color: #111827; margin-bottom: 0.25rem;">No se encontraron diseños</h3>
        <p style="color: #6b7280; font-size: 0.95rem;">Intenta con otro término de búsqueda para ver los productos disponibles.</p>
      </div>
    `;
    return;
  }

  const intentions = (CONFIG.candleIntentions || ['Salud', 'Amor', 'Dinero', 'Familia', 'Sueños', 'Viajes', 'Unión', 'Dios'])
    .slice(0, 4)
    .map(word => `<span class="intention-chip">${word}</span>`)
    .join('');

  grid.innerHTML = products.map((item) => {
    const orderMsg = encodeURIComponent(CONFIG.whatsappOrderMessage.replace('{nombre}', item.title));
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${orderMsg}`;

    return `
      <article class="product-card" data-id="${item.id}" data-index="${item.index}">
        <div class="product-image-box" data-action="quick-view" title="Clic para ver detalle y hacer zoom">
          <span class="product-tag-badge">Edición 7 de Dic</span>
          
          <img 
            class="product-img" 
            src="${item.url}" 
            alt="${item.title}" 
            loading="lazy"
          />

          <div class="quick-view-overlay">
            <button class="quick-view-btn" data-action="quick-view" aria-label="Vista rápida con zoom">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              Vista Rápida & Zoom
            </button>
          </div>
        </div>

        <div class="product-info">
          <div>
            <div class="product-vendor">Noche de Velitas • 8 Velas</div>
            <h2 class="product-title">${item.title}</h2>
            
            <div class="product-status-tag">
              <span class="status-dot"></span> Disponible • Edición 7 de Dic
            </div>

            <div class="product-intentions">
              ${intentions}
              <span class="intention-chip">+4 más</span>
            </div>
          </div>

          <div class="product-actions">
            <a 
              href="${whatsappUrl}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn-shopify-primary"
              title="Pedir por WhatsApp"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 2C6.5 2 2 6.502 2 12.036c0 1.99.585 3.844 1.597 5.41L2 22l4.747-1.547a9.98 9.98 0 0 0 5.284 1.583h.004c5.53 0 10.03-4.502 10.03-10.036C22.065 6.502 17.562 2 12.031 2zm5.856 14.237c-.247.69-1.229 1.282-1.74 1.341-.475.056-1.077.08-3.488-.916-2.92-1.207-4.81-4.223-4.957-4.417-.145-.195-1.184-1.574-1.184-2.999s.754-2.124 1.022-2.414c.269-.29.587-.363.784-.363.196 0 .393.003.564.012.181.01.424-.069.664.508.247.59.843 2.057.917 2.207.073.15.122.327.024.521-.097.195-.146.316-.293.488-.146.173-.309.387-.44.52-.147.147-.3.308-.13.6.17.292.753 1.242 1.616 2.012 1.111.99 2.049 1.296 2.341 1.442.292.146.463.122.634-.074.17-.194.731-.852.926-1.144.195-.292.39-.244.657-.146.269.098 1.688.796 1.98 1.442.049.122.073.244.073.341 0 .268-.073.707-.32 1.397z"/>
              </svg>
              Pedir por WhatsApp
            </a>

            <button class="btn-shopify-zoom" data-action="quick-view" title="Ver con lupa y pantalla completa" aria-label="Zoom">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Event listeners para abrir la vista rápida
  grid.querySelectorAll('[data-action="quick-view"]').forEach((elem) => {
    elem.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      if (card) {
        const index = parseInt(card.dataset.index, 10);
        lightbox.open(index);
      }
    });
  });
}

/**
 * Buscador en tiempo real
 */
function setupSearch(allProducts, lightbox) {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      renderStoreProducts(allProducts, lightbox);
      return;
    }

    const filtered = allProducts.filter((item) => {
      return item.title.toLowerCase().includes(query) || item.filename.toLowerCase().includes(query);
    });

    renderStoreProducts(filtered, lightbox);
  });
}

/**
 * Soporte para URLs con hash (ej. #vela-1)
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
