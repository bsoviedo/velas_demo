// =============================================================================
// VISOR LIGHTBOX CON ZOOM INTERACTIVO Y DETALLE
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
    this.overlay.className = 'lightbox-overlay';
    this.overlay.setAttribute('role', 'dialog');
    this.overlay.setAttribute('aria-modal', 'true');
    this.overlay.setAttribute('aria-label', 'Visor de imagen con zoom');

    this.overlay.innerHTML = `
      <div class="lightbox-backdrop"></div>
      
      <header class="lightbox-header">
        <div class="lightbox-counter-badge" id="lb-counter">1 / 1</div>
        <div class="lightbox-header-actions">
          <button class="lb-btn lb-btn-icon" id="lb-btn-share" title="Compartir diseño" aria-label="Compartir">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
          </button>
          <button class="lb-btn lb-btn-icon" id="lb-btn-close" title="Cerrar visor (Esc)" aria-label="Cerrar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      <div class="lightbox-stage" id="lb-stage">
        <div class="lightbox-img-wrapper" id="lb-wrapper">
          <img class="lightbox-img" id="lb-image" src="" alt="" draggable="false" />
        </div>

        <button class="lb-nav-btn lb-nav-prev" id="lb-prev" title="Anterior diseño (Flecha izquierda)" aria-label="Anterior">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <button class="lb-nav-btn lb-nav-next" id="lb-next" title="Siguiente diseño (Flecha derecha)" aria-label="Siguiente">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      <div class="lightbox-zoom-toolbar">
        <button class="lb-zoom-btn" id="lb-zoom-out" title="Alejar (-)" aria-label="Alejar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </button>
        <button class="lb-zoom-btn" id="lb-zoom-reset" title="Restablecer tamaño" aria-label="Restablecer">
          <span id="lb-zoom-level">100%</span>
        </button>
        <button class="lb-zoom-btn" id="lb-zoom-in" title="Acercar (+)" aria-label="Acercar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="11" y1="8" x2="11" y2="14"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </button>
      </div>

      <footer class="lightbox-footer">
        <div class="lightbox-caption">
          <h2 class="lightbox-title" id="lb-title">Título del Diseño</h2>
          <p class="lightbox-tip">💡 Doble clic o rueda del mouse para hacer zoom / Toca y arrastra para mover</p>
        </div>
        <div class="lightbox-footer-action">
          <a href="#" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp-order" id="lb-order-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 2C6.5 2 2 6.502 2 12.036c0 1.99.585 3.844 1.597 5.41L2 22l4.747-1.547a9.98 9.98 0 0 0 5.284 1.583h.004c5.53 0 10.03-4.502 10.03-10.036C22.065 6.502 17.562 2 12.031 2zm5.856 14.237c-.247.69-1.229 1.282-1.74 1.341-.475.056-1.077.08-3.488-.916-2.92-1.207-4.81-4.223-4.957-4.417-.145-.195-1.184-1.574-1.184-2.999s.754-2.124 1.022-2.414c.269-.29.587-.363.784-.363.196 0 .393.003.564.012.181.01.424-.069.664.508.247.59.843 2.057.917 2.207.073.15.122.327.024.521-.097.195-.146.316-.293.488-.146.173-.309.387-.44.52-.147.147-.3.308-.13.6.17.292.753 1.242 1.616 2.012 1.111.99 2.049 1.296 2.341 1.442.292.146.463.122.634-.074.17-.194.731-.852.926-1.144.195-.292.39-.244.657-.146.269.098 1.688.796 1.98 1.442.049.122.073.244.073.341 0 .268-.073.707-.32 1.397z"/>
            </svg>
            Pedir este diseño por WhatsApp
          </a>
        </div>
      </footer>
    `;

    document.body.appendChild(this.overlay);

    // Guardar referencias
    this.img = this.overlay.querySelector('#lb-image');
    this.wrapper = this.overlay.querySelector('#lb-wrapper');
    this.stage = this.overlay.querySelector('#lb-stage');
    this.titleEl = this.overlay.querySelector('#lb-title');
    this.counterEl = this.overlay.querySelector('#lb-counter');
    this.zoomLevelEl = this.overlay.querySelector('#lb-zoom-level');
    this.orderBtn = this.overlay.querySelector('#lb-order-btn');
    this.prevBtn = this.overlay.querySelector('#lb-prev');
    this.nextBtn = this.overlay.querySelector('#lb-next');
    this.closeBtn = this.overlay.querySelector('#lb-btn-close');
    this.shareBtn = this.overlay.querySelector('#lb-btn-share');
    this.backdrop = this.overlay.querySelector('.lightbox-backdrop');
    this.zoomInBtn = this.overlay.querySelector('#lb-zoom-in');
    this.zoomOutBtn = this.overlay.querySelector('#lb-zoom-out');
    this.zoomResetBtn = this.overlay.querySelector('#lb-zoom-reset');
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
      this.toggleZoom(e.clientX, e.clientY);
    });

    // Rueda del ratón para zoom
    this.stage.addEventListener('wheel', (e) => {
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
    document.body.classList.add('lightbox-locked');
  }

  close() {
    this.isOpen = false;
    this.overlay.classList.remove('active');
    document.body.classList.remove('lightbox-locked');
    this.resetZoom();
  }

  renderCurrent() {
    const item = this.products[this.currentIndex];
    if (!item) return;

    this.img.src = item.url;
    this.img.alt = item.title;
    this.titleEl.textContent = item.title;
    this.counterEl.textContent = `${this.currentIndex + 1} / ${this.products.length}`;

    // Construir enlace de WhatsApp con el mensaje personalizado
    const message = CONFIG.whatsappOrderMessage.replace('{nombre}', item.title);
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    this.orderBtn.href = whatsappUrl;

    // Deshabilitar botones de navegación si solo hay 1 producto
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

  toggleZoom(originX = null, originY = null) {
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
    if (this.zoomLevelEl) {
      this.zoomLevelEl.textContent = `${Math.round(this.scale * 100)}%`;
    }
  }

  async shareCurrent() {
    const item = this.products[this.currentIndex];
    if (!item) return;

    const shareData = {
      title: item.title,
      text: `¡Mira este diseño de velas para el 7 de diciembre! ${item.title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // Ignorar si canceló el share
      }
    } else {
      // Fallback: copiar enlace al portapapeles
      try {
        await navigator.clipboard.writeText(window.location.href);
        this.showToast('¡Enlace del catálogo copiado al portapapeles!');
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
