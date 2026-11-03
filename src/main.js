// =============================================================================
// MAIN APP - TIENDA ONLINE ESTILO SHOPIFY CON FILTROS DINÁMICOS
// =============================================================================
import { CONFIG } from './config.js';
import { getCandleProducts } from './js/catalog.js';
import { Lightbox } from './js/lightbox.js';

// Estado global de filtros
const state = {
  allProducts: [],
  selectedBox: 'all',
  selectedCandles: 'all',
  searchQuery: '',
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Cargar productos clasificados desde src/velas/
  state.allProducts = getCandleProducts();

  // 2. Inicializar Lightbox de zoom puro
  const lightbox = new Lightbox(state.allProducts);

  // 3. Aplicar textos de configuración
  applyConfig();

  // 4. Generar botones de filtro dinámicamente
  setupFilters(state.allProducts, lightbox);

  // 5. Configurar buscador
  setupSearch(lightbox);

  // 6. Renderizar catálogo inicial
  updateCatalogView(lightbox);

  // 7. Hash en URL
  checkUrlHash(state.allProducts, lightbox);
});

/**
 * Textos y cabeceras
 */
function applyConfig() {
  const announcementBar = document.getElementById('announcement-bar');
  const brandName = document.getElementById('brand-name');
  const footerBrand = document.getElementById('footer-brand-name');
  const collectionTitle = document.getElementById('collection-title');
  const collectionDesc = document.getElementById('collection-description');

  if (announcementBar && CONFIG.topBannerText) announcementBar.textContent = CONFIG.topBannerText;
  if (brandName && CONFIG.brandName) brandName.textContent = CONFIG.brandName;
  if (footerBrand && CONFIG.brandName) footerBrand.textContent = CONFIG.brandName;
  if (collectionTitle && CONFIG.catalogTitle) collectionTitle.textContent = CONFIG.catalogTitle;
  if (collectionDesc && CONFIG.catalogSubtitle) collectionDesc.textContent = CONFIG.catalogSubtitle;
}

/**
 * Configura y renderiza las pastillas de filtros por Caja y por Velas
 */
function setupFilters(products, lightbox) {
  const boxContainer = document.getElementById('filter-box-pills');
  const candleContainer = document.getElementById('filter-candle-pills');

  // Obtener colores únicos existentes en los productos
  const boxColors = Array.from(new Set(products.map(p => p.colorCaja))).filter(Boolean);
  const candleColors = Array.from(new Set(products.map(p => p.colorVelas))).filter(Boolean);

  // Generar botones de Color de Caja
  if (boxContainer) {
    boxContainer.innerHTML = `
      <button class="filter-pill active" data-type="caja" data-value="all">Todas</button>
      ${boxColors.map(color => `
        <button class="filter-pill" data-type="caja" data-value="${color}">
          ${getBoxIcon(color)} ${color}
        </button>
      `).join('')}
    `;

    boxContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-pill');
      if (!btn) return;
      boxContainer.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.selectedBox = btn.dataset.value;
      updateCatalogView(lightbox);
    });
  }

  // Generar botones de Color de Velas
  if (candleContainer) {
    candleContainer.innerHTML = `
      <button class="filter-pill active" data-type="velas" data-value="all">Todas</button>
      ${candleColors.map(color => `
        <button class="filter-pill" data-type="velas" data-value="${color}">
          ${getCandleIcon(color)} ${color}
        </button>
      `).join('')}
    `;

    candleContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-pill');
      if (!btn) return;
      candleContainer.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.selectedCandles = btn.dataset.value;
      updateCatalogView(lightbox);
    });
  }
}

function getBoxIcon(color) {
  const lower = color.toLowerCase();
  if (lower.includes('negra')) return '⬛';
  if (lower.includes('dorada')) return '🟨';
  if (lower.includes('verde')) return '🟩';
  if (lower.includes('roja')) return '🟥';
  if (lower.includes('blanca')) return '⬜';
  return '📦';
}

function getCandleIcon(color) {
  const lower = color.toLowerCase();
  if (lower.includes('blanca')) return '⚪';
  if (lower.includes('neon') || lower.includes('neón')) return '⚡';
  if (lower.includes('pastel')) return '🎨';
  return '🕯️';
}

/**
 * Filtra los productos según el estado actual y actualiza la vista
 */
function updateCatalogView(lightbox) {
  const filtered = state.allProducts.filter(item => {
    // Filtro caja
    const matchBox = state.selectedBox === 'all' || item.colorCaja === state.selectedBox;
    
    // Filtro velas
    const matchCandles = state.selectedCandles === 'all' || item.colorVelas === state.selectedCandles;

    // Buscador
    const matchSearch = !state.searchQuery || 
      item.title.toLowerCase().includes(state.searchQuery) ||
      item.colorCaja.toLowerCase().includes(state.searchQuery) ||
      item.colorVelas.toLowerCase().includes(state.searchQuery);

    return matchBox && matchCandles && matchSearch;
  });

  renderStoreProducts(filtered, lightbox);
}

/**
 * Renderiza los productos en grilla
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
        <h3 style="font-size: 1.25rem; font-weight: 700; color: #111827; margin-bottom: 0.25rem;">No hay diseños con estos filtros</h3>
        <p style="color: #6b7280; font-size: 0.95rem;">Prueba seleccionando "Todas" o cambiando la combinación de colores.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = products.map((item) => {
    const isAvailable = item.disponible !== false;
    const badgeText = isAvailable ? item.colorVelas : 'Agotado';
    const badgeClass = isAvailable ? 'product-tag-badge' : 'product-tag-badge badge-soldout';
    const statusText = isAvailable 
      ? `<span class="status-dot"></span> Disponible` 
      : `<span class="status-dot soldout"></span> Agotado temporalmente`;

    return `
      <article class="product-card ${!isAvailable ? 'card-soldout' : ''}" data-id="${item.id}" data-index="${item.index}">
        <div class="product-image-box" data-action="quick-view" title="Clic para ampliar con zoom">
          <span class="${badgeClass}">${badgeText}</span>
          
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
            <div class="product-meta-row">
              <span class="meta-tag">${item.colorCaja}</span>
              <span class="meta-separator">•</span>
              <span class="meta-tag">${item.colorVelas}</span>
            </div>
            
            <h2 class="product-title">${item.title}</h2>

            <div class="product-status-tag ${!isAvailable ? 'status-soldout' : ''}">
              ${statusText}
            </div>
          </div>

          <div class="product-actions">
            <button 
              class="btn-shopify-primary"
              data-action="quick-view"
              title="Ampliar diseño con zoom"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              Ver Zoom
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
 * Buscador
 */
function setupSearch(lightbox) {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.toLowerCase().trim();
    updateCatalogView(lightbox);
  });
}

/**
 * URL Hash
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
