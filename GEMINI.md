# Code Aeternum Web — Contexto para IA / Referencia futura

Documento de contexto del proyecto para mantener consistencia en futuras sesiones, integraciones o handoffs.

---

## 1. Qué es el proyecto

- **Sitio web estático** de **Code Aeternum**: marca de software (extensiones de navegador y herramientas de desarrollo).
- **Productos principales:**
  - **TG Media Grabber Pro**: extensión Chrome para descargar medios de Telegram Web (fotos, videos, GIFs) en bulk.
  - **CommandDock**: aplicación de escritorio (Electron) panel de comandos contextual para desarrolladores.
- **Despliegue:** GitHub Pages. Dominio custom: `codeaeternum.com` (archivo `CNAME`).
- **Sin backend:** Solo HTML, CSS y un pequeño script inline (IntersectionObserver para scroll reveal). Contacto vía `mailto:`, soporte/donaciones vía Ko-fi, GitHub, X (Twitter).

---

## 2. Estructura del proyecto

```
code_aeternum_web/
├── index.html              # Home EN
├── tg-grabber-pro.html     # Página producto TG Grabber Pro (EN)
├── tg-grabber-pro-changelog.html
├── commanddock.html
├── commanddock-changelog.html
├── terms.html
├── privacy.html
├── refund-policy.html
├── es/                     # Versión en español (espejo de páginas)
│   ├── index.html
│   ├── tg-grabber-pro.html
│   ├── tg-grabber-pro-changelog.html
│   ├── commanddock.html
│   └── commanddock-changelog.html
├── css/
│   ├── style.css           # Sistema global: variables, header, hero, footer, legal, responsive, skip-link, focus-visible, prefers-reduced-motion
│   ├── product.css         # Páginas de producto (hero, features, steps, downloads, CTA)
│   └── changelog.css       # Timeline y estilos de changelog
├── js/
│   └── reveal.js           # Scroll reveal (IntersectionObserver) para .reveal
├── img/                    # Logo, favicon, iconos de producto, screenshots
├── downloads/              # ZIPs (ej. tg-media-grabber-pro.zip)
├── CNAME                   # codeaeternum.com para GitHub Pages
├── README.md               # Descripción, estructura, desarrollo local
├── AUDITORIA_PROYECTO.md   # Auditoría detallada (enlaces, a11y, SEO, mantenibilidad)
└── GEMINI.md               # Este archivo (contexto para IA/referencia)
```

- **Idiomas:** EN en raíz, ES en carpeta `es/`. Recursos compartidos con rutas `../css/`, `../img/`, etc. desde `es/`.
- **Ancla de productos en home:** `id="products"` (no `#product`). Todos los enlaces a la sección de productos deben usar `#products` o `index.html#products` / `es/index.html#products` según contexto.

---

## 3. Stack y convenciones técnicas

| Aspecto        | Detalle |
|----------------|--------|
| **HTML**       | Semántico, una sola `<h1>` por página. Header/nav/footer repetidos en cada HTML (sin templating). |
| **CSS**        | Variables en `:root` en `style.css`. Paleta: `--bg-dark`, `--primary` (cobre/bronce), `--accent` (teal), `--text-main`, `--text-muted`. Fuentes: Outfit (sans), Cormorant Garamond (serif títulos). |
| **JS**         | `js/reveal.js`: IntersectionObserver para elementos `.reveal` (scroll reveal). Cargado en home EN/ES. |
| **Cache bust** | Query string en CSS: `?v=2.0`, `?v=2.1`. Incrementar al cambiar estilos. |

---

## 4. Decisiones tomadas (post-auditoría)

- **Anclas:** Unificado a `#products` en todos los enlaces que apuntan a la sección de productos en home.
- **CTA “Install” (Chrome Web Store):** Mientras no exista URL de la extensión en la store, el botón principal en TG Grabber Pro apunta a la descarga ZIP; el de “Chrome Web Store” puede ser secundario o “Coming soon” para no tener `href="#"`.
- **Footer:** Enlaces a productos en el footer llevan a sus páginas (`tg-grabber-pro.html`, `commanddock.html`) y no a `#`.
- **Clase `.x-btn`:** Definida en `product.css` para el botón “Follow us” / X (Twitter) en secciones de soporte, coherente con `.kofi-btn` y `.github-btn`.
- **Documentación:** `AUDITORIA_PROYECTO.md` para hallazgos y checklist; `GEMINI.md` para contexto persistente (IA y humanos).

---

## 5. Enlaces y rutas importantes

- **Home EN:** `index.html`. Home ES: `es/index.html`.
- **Productos:** `tg-grabber-pro.html`, `commanddock.html` (y `es/`).
- **Legal:** `terms.html`, `privacy.html`, `refund-policy.html` (solo EN por ahora; ES opcional más adelante).
- **Externos:** mailto:codeaeternum@outlook.com, Ko-fi, GitHub (org y repo CommandDock), X @CodeAeternum.
- **TG Media Grabber Pro — Chrome Web Store:** `https://chromewebstore.google.com/detail/tg-media-grabber-pro/opbopilodjdiblbohlkffmmgijafcigf` (usar con `target="_blank"` y `rel="noopener noreferrer"`).
- **Descarga TG Grabber Pro (ZIP / sideload):** `downloads/tg-media-grabber-pro.zip`.

---

## 6. Mejoras aplicadas (post-auditoría, marzo 2026)

- **Anclas:** Todos los enlaces a la sección de productos usan `#products` (index, es/index, terms, privacy, refund-policy, tg-grabber-pro EN/ES).
- **Footer:** Enlaces a “TG Media Grabber Pro” y “CommandDock” en el footer apuntan a `tg-grabber-pro.html` y `commanddock.html` (no `#`).
- **CTA Install (TG Grabber Pro):** CTA principal = “Add to Chrome — Free” / “Añadir a Chrome — Gratis” con enlace a la Chrome Web Store; secundario = “Download ZIP (Sideload)” / “Descargar ZIP (instalación manual)”. URL de la extensión en la store: ver sección 5 (Enlaces y rutas importantes).
- **CTA inferior en TG Grabber Pro:** “Get It Free on Chrome Web Store” / “Obtener Gratis en Chrome Store” sustituido por enlace “Download ZIP” al ZIP.
- **Estilos:** Clase `.x-btn` definida en `style.css` (mismo estilo que `.github-btn`). Clase `.cta-coming-soon` en `product.css` (opacidad reducida, no clicable).
- **Accesibilidad:** Skip link (“Skip to main content” / “Saltar al contenido”) y `<main id="main">` en **todas** las páginas (home, producto, legal, changelog EN y ES). Estilos del skip link y `:focus-visible` para nav, CTAs y footer en `style.css`. Para nuevas páginas: incluir `<a href="#main" class="skip-link">...</a>` tras `<body>` y envolver el contenido principal en `<main id="main">`.
- **Header legal:** En `terms.html`, `privacy.html` y `refund-policy.html` se añadieron iconos X y GitHub, y selector de idioma (ES → `es/index.html`).
- **Performance / a11y:** Preconnect a Google Fonts en **todas** las páginas HTML que cargan `style.css`. En `style.css`, `@media (prefers-reduced-motion: reduce)` desactiva la animación de la marquesina.
- **Documentación:** `README.md` en la raíz con descripción, estructura, cómo correr en local y referencias a GEMINI.md y AUDITORIA_PROYECTO.md.
- **SEO:** En todas las páginas: `<link rel="canonical" href="https://codeaeternum.com/...">` y `<meta property="og:image" content="https://codeaeternum.com/img/logo-sin-nombre32x32.png">`. Para mejores previsualizaciones en redes se puede añadir luego una imagen dedicada (p. ej. 1200×630) en `img/og-image.png` y actualizar la URL.
- **Script reveal:** Extraído a `js/reveal.js`; referenciado en `index.html` y `es/index.html` (`../js/reveal.js` desde `es/`).
- **Hardening (/harden):**
  - **reveal.js:** Ejecución en `DOMContentLoaded`, comprobación de `IntersectionObserver`, iteración segura; si no hay IntersectionObserver se aplica `.visible` a todos los `.reveal`.
  - **Fallback sin JS:** En `index.html` y `es/index.html`, `<html class="no-js">` y script que quita la clase al cargar; en `style.css`, `.no-js .reveal` y `html.no-script .reveal` muestran el contenido sin animación.
  - **i18n:** En todas las páginas con versión EN y ES se añadieron `<link rel="alternate" hreflang="en">`, `hreflang="es"` y `hreflang="x-default"` (home, tg-grabber-pro, commanddock, changelogs de ambos).
  - **Desbordamiento de texto:** En `style.css`, `overflow-wrap: break-word` / `word-break: break-word` en títulos de hero, featured, value-card y feature-card; en `product.css`, en `.product-tagline`, `.product-hero h1`, y `overflow-x: auto` en `.code-inline` y `pre`.
- **Optimización (/optimize):**
  - **LCP:** En `index.html` y `es/index.html`, `rel="preload"` del logo (`img/logo-sin-nombre32x32.png`) y `fetchpriority="high"` en el `<img>` del logo; en páginas de producto, `fetchpriority="high"` en el icono del hero.
  - **Imágenes:** Todas las imágenes con `decoding="async"`; las below-the-fold (featured en home, screenshots, iconos del footer) con `loading="lazy"`; dimensiones explícitas `width`/`height` en iconos (32, 64, 120) y en las imágenes de featured del home (120×120) para evitar CLS.
  - **Scripts:** `reveal.js` cargado con `defer` en index y es/index.
  - **Animaciones:** En `style.css`, `will-change: transform` en `.marquee-track` para capa GPU; en `@media (prefers-reduced-motion: reduce)` se desactiva la animación y `will-change: auto`.
- **Adaptación (/adapt):**
  - **Safe area:** `body` con `padding-left`/`padding-right: env(safe-area-inset-left/right)`; `footer` con `padding-bottom: calc(4rem + env(safe-area-inset-bottom))`; `header` con `top: max(1.5rem, env(safe-area-inset-top))`; `.legal-content` con padding horizontal usando `max(5%, env(safe-area-inset-*))`.
  - **Touch targets:** `.cta-button`, `.support-btn` con `min-height: 44px`; en `@media (max-width: 768px)` los `nav a` y `.footer-col a` con `min-height: 44px`, `display: inline-flex`, `align-items: center` y padding adecuado; en 480px los `.hero-actions .cta-button` a ancho completo y `min-height: 48px`; en product.css lo mismo para `.product-hero .hero-actions` en 480px.
  - **Tap highlight:** `a, button` con `-webkit-tap-highlight-color` y `tap-highlight-color` (tono primary suave) para feedback táctil.
  - **Responsive:** En 768px, `.support-btns` con `flex-wrap: wrap`; en 480px botones CTA en columna y a ancho completo; `.promo-screenshot` con padding horizontal con safe area en 480px (product.css).
- **Claridad (/clarify):**
  - **Footer:** Enlace mailto unificado como "Contact" / "Contacto" en todas las páginas (antes "Support"/"Soporte" en productos y changelogs).
  - **Hero notes (TG Grabber):** "Compatible with: Telegram Web (K & A) · Chrome, Edge, Brave" (EN) y equivalente en ES; deja claro requisitos sin tecnicismos.
  - **Manual install:** Título "Manual install (without the Store)" / "Instalación manual (sin la Store)"; párrafo con lead "Prefer to install without the Chrome Web Store?" / "¿Prefieres no usar la Chrome Web Store?" y pasos con "turn on Developer mode" / "Activar modo desarrollador", "select the extracted folder" / "selecciona la carpeta extraída".
  - **How it works (paso 1):** "No setup required — it works as soon as you install" (EN); "No hace falta configurar nada — funciona en cuanto lo instalas" (ES).
  - **CTAs:** Home EN "See our products ↓", ES "Ver productos ↓" y "Ver más →" en lugar de "Saber más →"; ES soporte "Dar estrella en GitHub" en lugar de "Star en GitHub".

## 7. Mejoras pendientes (referencia)

Ver checklist en `AUDITORIA_PROYECTO.md`. Resumen corto:

- **Pendiente (opcional):** Imagen og dedicada 1200×630 en `img/og-image.png` y actualizar `og:image`; versiones ES de terms/privacy/refund si se desea.

---

## 8. Cómo usar este archivo

- **Para desarrolladores/IA:** Leer al inicio de una sesión para conocer estructura, convenciones y decisiones.
- **Actualizar** cuando se añadan páginas, productos, idiomas o se cambien convenciones (por ejemplo anclas, rutas o nombres de clases).
- No reemplaza la auditoría: `AUDITORIA_PROYECTO.md` tiene el detalle de hallazgos y acciones; `GEMINI.md` tiene el “estado del mundo” y las reglas de juego.
