// =============================================================================
// MODAL QUICK VIEW & ZOOM ESTILO SHOPIFY (DRAWER / SPLIT SCREEN)
// =============================================================================
import { CONFIG } from '../config.js';

export class Lightbox {
  constructor(products) {
    this.products = products;
    this.currentIndex = 0;
    this.isOpen = false;
    
    // Zoom y Pan state
    this.scale = 1;
    this.minScale = 1;
    this.maxScale = 3.5;
    this.translateX = 0;
    this.translateY = 0;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.lastTouchDistance = 0;

    this.createElements();
    this.bindEvents();
  }

  createElements() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'shopify-modal-overlay';
    this.overlay.setAttribute('role', 'dialog');
    this.overlay.setAttribute('aria-modal', 'true');
    this.overlay.setAttribute('aria-label', 'Vista rápida de producto con zoom');

    this.overlay.innerHTML = `
      <div class="shopify-modal-backdrop"></div>
      
      <div class="shopify-modal-card">
        <!-- Botón cerrar (X) -->
        <button class="modal-close-btn" id="modal-close" title="Cerrar ventana (Esc)" aria-label="Cerrar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <!-- LADO IZQUIERDO: VISOR DE IMAGEN CON ZOOM -->
        <div class="modal-viewport-side" id="modal-viewport">
          <div class="modal-image-wrapper" id="modal-img-wrapper">
            <img class="modal-img" id="modal-img" src="" alt="" draggable="false" />
          </div>

          <!-- Flechas de navegación -->
          <button class="modal-nav-arrow modal-nav-prev" id="modal-prev" title="Diseño anterior" aria-label="Anterior">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button class="modal-nav-arrow modal-nav-next" id="modal-next" title="Siguiente diseño" aria-label="Siguiente">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          <!-- Barra de controles de zoom -->
          <div class="modal-zoom-bar">
            <button class="zoom-btn" id="zoom-out-btn" title="Alejar (-)" aria-label="Alejar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </button>
            <span id="modal-zoom-display">100%</span>
            <button class="zoom-btn" id="zoom-in-btn" title="Acercar (+)" aria-label="Acercar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </button>
            <button class="zoom-btn" id="zoom-reset-btn" title="Restablecer tamaño">1:1</button>
          </div>
        </div>

        <!-- LADO DERECHO: PANEL DE INFORMACIÓN SHOPIFY -->
        <div class="modal-details-side">
          <div class="modal-vendor-tag">EDICIÓN 7 DE DICIEMBRE • CAJITA ARTESANAL</div>
          <h2 class="modal-product-title" id="modal-title">Título del Diseño</h2>

          <div class="modal-status-pill">
            <span class="status-dot"></span> Disponible para pedido • 7 de Diciembre
          </div>

          <div class="modal-features-box">
            <div class="feature-row">
              <span>🕯️</span>
              <div>
                <strong>8 Velas con Deseos:</strong>
                <p id="modal-intentions-text">Salud, Amor, Dinero, Familia, Sueños, Viajes, Unión, Dios.</p>
              </div>
            </div>
            <div class="feature-row">
              <span>🎁</span>
              <div>
                <strong>Presentación:</strong>
                <p>Caja troquelada con motivos navideños y noche de velitas.</p>
              </div>
            </div>
            <div class="feature-row">
              <span>🚚</span>
              <div>
                <strong>Disponibilidad:</strong>
                <p>Envíos y entregas programadas antes del 7 de diciembre.</p>
              </div>
            </div>
          </div>

          <p style="font-size: 0.82rem; color: #6b7280; margin-bottom: 1.25rem;">
            💡 <em>Usa la rueda del ratón, doble clic o pellizca en la foto para hacer zoom a las velas.</em>
          </p>

          <div class="modal-actions">
            <button class="btn-modal-share" id="modal-share-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              Compartir este diseño
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(this.overlay);

    // Guardar referencias del DOM
    this.img = this.overlay.querySelector('#modal-img');
    this.wrapper = this.overlay.querySelector('#modal-img-wrapper');
    this.viewport = this.overlay.querySelector('#modal-viewport');
    this.titleEl = this.overlay.querySelector('#modal-title');
    this.zoomDisplayEl = this.overlay.querySelector('#modal-zoom-display');
    this.prevBtn = this.overlay.querySelector('#modal-prev');
    this.nextBtn = this.overlay.querySelector('#modal-next');
    this.closeBtn = this.overlay.querySelector('#modal-close');
    this.backdrop = this.overlay.querySelector('.shopify-modal-backdrop');
    this.zoomInBtn = this.overlay.querySelector('#zoom-in-btn');
    this.zoomOutBtn = this.overlay.querySelector('#zoom-out-btn');
    this.zoomResetBtn = this.overlay.querySelector('#zoom-reset-btn');
    this.shareBtn = this.overlay.querySelector('#modal-share-btn');
  }

  bindEvents() {
    // Cerrar
    this.closeBtn.addEventListener('click', () => this.close());
    this.backdrop.addEventListener('click', () => this.close());

    // Navegación
    this.prevBtn.addEventListener('click', () => this.prev());
    this.nextBtn.addEventListener('click', () => this.next());

    // Teclado
    window.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
      if (e.key === '+' || e.key === '=') this.zoom(0.3);
      if (e.key === '-') this.zoom(-0.3);
      if (e.key === '0') this.resetZoom();
    });

    // Zoom botones
    this.zoomInBtn.addEventListener('click', () => this.zoom(0.4));
    this.zoomOutBtn.addEventListener('click', () => this.zoom(-0.4));
    this.zoomResetBtn.addEventListener('click', () => this.toggleZoom());

    // Doble clic para alternar zoom
    this.wrapper.addEventListener('dblclick', (e) => {
      e.preventDefault();
      this.toggleZoom();
    });

    // Rueda del ratón para zoom
    this.viewport.addEventListener('wheel', (e) => {
      if (!this.isOpen) return;
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.25 : -0.25;
      this.zoom(delta);
    }, { passive: false });

    // Drag / Pan con ratón
    this.wrapper.addEventListener('mousedown', (e) => {
      if (this.scale <= 1) return;
      this.isDragging = true;
      this.startX = e.clientX - this.translateX;
      this.startY = e.clientY - this.translateY;
      this.wrapper.style.cursor = 'grabbing';
      e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging || !this.isOpen) return;
      this.translateX = e.clientX - this.startX;
      this.translateY = e.clientY - this.startY;
      this.updateTransform();
    });

    window.addEventListener('mouseup', () => {
      if (this.isDragging) {
        this.isDragging = false;
        if (this.wrapper) this.wrapper.style.cursor = this.scale > 1 ? 'grab' : 'zoom-in';
      }
    });

    // Touch events (Pinch-to-zoom y Pan móvil)
    this.wrapper.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.startX = e.touches[0].clientX - this.translateX;
        this.startY = e.touches[0].clientY - this.translateY;
      } else if (e.touches.length === 2) {
        this.isDragging = false;
        this.lastTouchDistance = this.getTouchDistance(e.touches);
      }
    }, { passive: true });

    this.wrapper.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && this.isDragging && this.scale > 1) {
        this.translateX = e.touches[0].clientX - this.startX;
        this.translateY = e.touches[0].clientY - this.startY;
        this.updateTransform();
      } else if (e.touches.length === 2) {
        const currentDistance = this.getTouchDistance(e.touches);
        if (this.lastTouchDistance > 0) {
          const delta = (currentDistance - this.lastTouchDistance) * 0.008;
          this.zoom(delta);
        }
        this.lastTouchDistance = currentDistance;
      }
    }, { passive: true });

    this.wrapper.addEventListener('touchend', () => {
      this.isDragging = false;
      this.lastTouchDistance = 0;
    });

    // Compartir diseño
    this.shareBtn.addEventListener('click', () => this.shareCurrent());
  }

  getTouchDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  open(index) {
    this.currentIndex = index;
    this.isOpen = true;
    this.resetZoom();
    this.renderCurrent();
    this.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.isOpen = false;
    this.overlay.classList.remove('active');
    document.body.style.overflow = '';
    this.resetZoom();
  }

  renderCurrent() {
    const item = this.products[this.currentIndex];
    if (!item) return;

    this.img.src = item.url;
    this.img.alt = item.title;
    this.titleEl.textContent = item.title;


    if (this.products.length <= 1) {
      this.prevBtn.style.display = 'none';
      this.nextBtn.style.display = 'none';
    } else {
      this.prevBtn.style.display = 'flex';
      this.nextBtn.style.display = 'flex';
    }

    this.resetZoom();
  }

  next() {
    if (this.products.length <= 1) return;
    this.currentIndex = (this.currentIndex + 1) % this.products.length;
    this.renderCurrent();
  }

  prev() {
    if (this.products.length <= 1) return;
    this.currentIndex = (this.currentIndex - 1 + this.products.length) % this.products.length;
    this.renderCurrent();
  }

  zoom(amount) {
    let newScale = this.scale + amount;
    newScale = Math.max(this.minScale, Math.min(this.maxScale, newScale));
    this.scale = Math.round(newScale * 100) / 100;

    if (this.scale <= 1) {
      this.translateX = 0;
      this.translateY = 0;
    }
    this.updateTransform();
  }

  toggleZoom() {
    if (this.scale > 1.2) {
      this.resetZoom();
    } else {
      this.scale = 2.2;
      this.translateX = 0;
      this.translateY = 0;
      this.updateTransform();
    }
  }

  resetZoom() {
    this.scale = 1;
    this.translateX = 0;
    this.translateY = 0;
    this.updateTransform();
  }

  updateTransform() {
    if (this.wrapper) {
      this.wrapper.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
      this.wrapper.style.cursor = this.scale > 1 ? 'grab' : 'zoom-in';
    }
    if (this.zoomDisplayEl) {
      this.zoomDisplayEl.textContent = `${Math.round(this.scale * 100)}%`;
    }
  }

  async shareCurrent() {
    const item = this.products[this.currentIndex];
    if (!item) return;

    const shareData = {
      title: item.title,
      text: `¡Mira esta cajita de velas para el 7 de diciembre! ${item.title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {}
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        this.showToast('¡Enlace del diseño copiado al portapapeles!');
      } catch (err) {
        this.showToast('Copia la URL del navegador para compartir.');
      }
    }
  }

  showToast(text) {
    let toast = document.querySelector('.catalog-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'catalog-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 3000);
  }
}
