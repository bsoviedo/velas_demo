# 🕯️ Catálogo Noche de Velitas (7 de Diciembre) ✨

Un catálogo web visualmente atractivo, ultra-rápido y 100% responsive, diseñado especialmente para exhibir los diseños de cajitas de velas para el 7 de diciembre y facilitar que los clientes hagan zoom en los detalles y hagan pedidos directamente por **WhatsApp**.

---

## 🚀 ¿Cómo funciona? (¡Sin quemar nombres de imágenes!)

No necesitas programar ni tocar código cada vez que tengas un nuevo diseño:

1. **Guarda o arrastra tus fotos** en una sola carpeta:
   👉 **`src/velas/`** (admite `.jpg`, `.jpeg`, `.png`, `.webp`).
2. El sistema lee **automáticamente** todas las imágenes que coloques allí y las convierte en tarjetas de catálogo organizadas alfabéticamente.
3. El título del diseño se genera de forma limpia a partir del nombre del archivo:
   - Por ejemplo, `caja-noche-de-velitas.jpg` se mostrará como **"Caja Noche de Velitas"**.
   - `caja-dorada-virgen.jpg` se mostrará como **"Caja Dorada Virgen"**.
   - Si se llama `1.jpg`, se mostrará como **"Diseño #1"**.

---

## 📱 Funcionalidades Principales

- **Visor con Zoom Interactivo (Lightbox)**:
  - Doble clic / doble toque para acercar hasta 3.5x y leer con claridad las palabras en las velas (*"Salud"*, *"Amor"*, *"Dinero"*, etc.).
  - Arrastra con el mouse o con el dedo (pan) para inspeccionar cada detalle.
  - Botones de zoom (+, -, 100%), botón de compartir y navegación (siguiente / anterior).
  - Compatible con gestos táctiles (pinch-to-zoom en celulares).
- **Pedidos directos a WhatsApp**:
  - Cada diseño tiene su botón de *"Pedir este diseño por WhatsApp"*.
  - Al presionarlo, abre el chat de WhatsApp con un mensaje pre-llenado indicando qué diseño le gustó al cliente.
- **Buscador en tiempo real**:
  - Permite al cliente filtrar rápidamente diseños por nombre.
- **Diseño Festivo & Responsive**:
  - Paleta nocturna con destellos dorados, estrellas y velita animada.
  - Se adapta a la perfección en cualquier teléfono móvil (iPhone, Android) y pantallas de computador.

---

## ⚙️ Configuración (Número de WhatsApp y Textos)

Abre el archivo **`src/config.js`** y edita tus datos básicos:

```javascript
export const CONFIG = {
  // Pon tu número de WhatsApp con indicativo de país (57 para Colombia + número)
  whatsappNumber: '573001234567',

  // Nombre de tu marca o negocio
  brandName: 'Velas Noche de Velitas',

  // Título del catálogo
  catalogTitle: 'Colección Noche de Velitas ✨',

  // Subtítulo
  catalogSubtitle: 'Diseños exclusivos en cajita listos para iluminar tus mejores deseos...',

  // Aviso superior
  topBannerText: '🕯️ ¡Separa tus cajitas con anticipación para este 7 de diciembre!',
  
  // Mensaje que enviará el cliente por WhatsApp
  whatsappOrderMessage: '¡Hola! Me encantó este diseño del catálogo: *{nombre}*. ¿Tienen disponibilidad y qué precio tiene?',
};
```

---

## 💻 Desarrollo Local

Para ver el catálogo en tu computadora:

```bash
# 1. Instalar dependencias (solo la primera vez)
npm install

# 2. Iniciar servidor local
npm run dev
```

Abre el enlace que te mostrará en la terminal (normalmente `http://localhost:3000`). Cualquier foto nueva que agregues a `src/velas/` se verá al instante.

---

## 🌐 Publicar en GitHub Pages

Este proyecto ya incluye el flujo automatizado de GitHub Actions en `.github/workflows/deploy.yml`.

### Pasos para publicar:
1. Sube este proyecto a tu repositorio de GitHub:
   ```bash
   git init
   git add .
   git commit -m "Catálogo de Velas para Noche de Velitas"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
   git push -u origin main
   ```
2. En GitHub, ve a tu repositorio:
   - Entra a **Settings** (Configuración) > pestaña **Pages** (en el menú lateral izquierdo).
   - En **Build and deployment** > **Source**, selecciona: **GitHub Actions**.
3. ¡Listo! En 1 minuto tu catálogo estará público en:  
   `https://TU-USUARIO.github.io/TU-REPOSITORIO/`

Cada vez que agregues o cambies fotos en `src/velas/` y hagas `git push`, GitHub Pages se actualizará automáticamente.
