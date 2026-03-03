# Auditoría completa — Code Aeternum Web

**Fecha:** 3 de marzo de 2026  
**Alcance:** Frontend (HTML/CSS/UX), consistencia, accesibilidad, SEO, mantenibilidad.  
**Nota:** El proyecto es 100% estático (sin backend); la auditoría se centra en lo existente.

---

## 1. Resumen ejecutivo

| Área              | Estado   | Prioridad |
|-------------------|----------|-----------|
| Enlaces rotos     | Crítico  | Alta      |
| Consistencia IDs  | Crítico  | Alta      |
| UX (CTAs)         | Crítico  | Alta      |
| Accesibilidad    | Mejorable| Media     |
| SEO / Meta       | Mejorable| Media     |
| Performance CSS  | Mejorable| Baja      |
| Mantenibilidad   | Mejorable| Media     |
| Documentación    | Ausente  | Media     |

---

## 2. Backend

**No existe backend.** El sitio es estático (HTML + CSS + un script inline).  
Contacto y soporte se resuelven con `mailto:`, Ko-fi, GitHub y X.

**Recomendación:** Mantener el enfoque estático para GitHub Pages. Si en el futuro necesitas formularios, newsletter o analytics propio, valorar servicios serverless (Cloudflare Workers, Vercel Edge, Formspree, etc.) sin añadir un backend tradicional.

---

## 3. Frontend — Hallazgos críticos

### 3.1 Enlaces rotos y anclas incorrectas

- **`#product` vs `#products`**  
  En la home la sección de productos tiene `id="products"`, pero varios enlaces usan `#product` (singular):
  - `index.html`: CTA hero "Explore Our Work ↓" → `#product` (debería ser `#products`).
  - `es/index.html`: CTA "Explorar ↓" → `#product`.
  - `terms.html`, `privacy.html`, `refund-policy.html`, `tg-grabber-pro.html`, `es/tg-grabber-pro.html`: nav "Product" / "Producto" → `index.html#product`.
  - **Acción:** Unificar a `#products` en todos los enlaces que apunten a la sección de productos.

- **Enlaces con `href="#"`**  
  No llevan a ninguna parte y confunden al usuario:
  - **TG Grabber Pro (EN/ES):** Botón "Install Free — Chrome Web Store" y "Get It Free on Chrome Web Store" / "Obtener Gratis en Chrome Store" con `href="#"` y `id="installBtn"` sin script asociado.
  - **Footer:** En `tg-grabber-pro.html` y `es/tg-grabber-pro.html`: "TG Media Grabber Pro" en la columna Products con `href="#"`. En `commanddock.html` y `es/commanddock.html`: "CommandDock" con `href="#"`.
  - **Acción:**  
    - Para "Install": enlazar a la URL real de Chrome Web Store cuando exista, o sustituir por "Download ZIP" como CTA principal hasta tener la extensión publicada.  
    - En el footer: enlazar a la página del producto correspondiente (`tg-grabber-pro.html`, `commanddock.html`).

### 3.2 Navegación y consistencia entre páginas

- En **legal** (terms, privacy, refund) el header no incluye iconos de redes ni selector de idioma, a diferencia del resto del sitio.  
  **Recomendación:** Usar el mismo header (con redes y ES/EN) en todas las páginas para coherencia y para que el usuario pueda cambiar de idioma desde cualquier vista.

- En **changelog** el nav dice "TG Grabber Pro" en lugar de "Products" o "Productos". Está bien como atajo contextual, pero conviene que el resto de enlaces (Home, Contact, etc.) sigan el mismo patrón que el resto del sitio.

---

## 4. UI/UX

### 4.1 Fortalezas

- Paleta coherente (slate, copper/bronze), variables CSS y tipografías (Outfit, Cormorant Garamond) bien aplicadas.
- Diseño responsive con breakpoints 768px y 480px.
- Scroll suave (`scroll-behavior: smooth`), animaciones de reveal y marquesina que dan sensación de producto cuidado.
- Uso de `loading="lazy"` en al menos una imagen (promo-screenshot en TG Grabber Pro).

### 4.2 Mejoras recomendadas

- **Botón "Install" / Chrome Web Store:** Mientras no haya URL de la extensión, evitar un CTA que lleve a `#`. Opciones: deshabilitar el botón y texto tipo "Coming to Chrome Web Store soon" o destacar solo "Download ZIP (Sideload)" como acción principal.
- **Footer:** En producto actual, el enlace a "TG Media Grabber Pro" / "CommandDock" en la columna Products debería llevar a su página, no a `#`.
- **Estilo del botón X (Twitter):** Se usa la clase `support-btn x-btn` en TG Grabber Pro y CommandDock, pero `.x-btn` no está definida en `product.css`. Visualmente hereda de `.support-btn`; si quieres un estilo distinto (por ejemplo color de marca X), define `.x-btn` en `product.css` (o en `style.css` si es global).
- **Marquesina:** En móvil puede ser demasiado rápida o ocupar mucho espacio. Valorar `prefers-reduced-motion: reduce` para detener o ralentizar la animación y mejorar accesibilidad.

---

## 5. Accesibilidad (a11y)

### 5.1 Lo que está bien

- `lang="en"` / `lang="es"` en `<html>`.
- `aria-label` en iconos de redes (X, GitHub).
- `alt` en imágenes revisadas (logo, iconos de producto, promo).
- Contraste oscuro con texto claro, en general adecuado.

### 5.2 Mejoras

- **Skip link:** Añadir un enlace "Skip to main content" al inicio del `<body>` (visible al recibir foco) que apunte a `#main` o al `<main>`, y marcar el contenido principal con `<main id="main">` en cada página. Mejora la navegación por teclado y lectores de pantalla.
- **Landmarks:** Usar `<main>` para el contenido principal y, si aplica, `<nav>` con `aria-label="Main"` en el header para que los usuarios de a11y identifiquen mejor las regiones.
- **Focus visible:** Revisar que todos los enlaces y botones tengan un `outline` o `box-shadow` visible en `:focus-visible` (no solo `:hover`). En `style.css` no hay regla global para `:focus-visible`.
- **Encabezados:** Asegurar una sola `<h1>` por página y una jerarquía lógica (h1 → h2 → h3). En las páginas revisadas se cumple; mantenerlo en legal y changelog.
- **Enlaces con `href="#"`:** Eliminarlos o reemplazarlos por enlaces reales; los que no hacen nada perjudican a usuarios de teclado y lectores de pantalla.

---

## 6. SEO y meta

### 6.1 Lo que está bien

- Títulos y `meta description` por página.
- Open Graph básico (og:title, og:description, og:type, og:url).
- En páginas de producto, Twitter cards (twitter:card, twitter:site, twitter:title, twitter:description).
- `meta name="keywords"` en TG Grabber Pro y CommandDock.

### 6.2 Mejoras

- **og:image:** Añadir `og:image` (y `twitter:image` si aplica) en todas las páginas con una imagen representativa (logo o captura) para que las previsualizaciones en redes y mensajería se vean bien.
- **URL canónica:** Añadir `<link rel="canonical" href="https://codeaeternum.com/...">` en cada página para evitar duplicados (especialmente con versión EN/ES).
- **Estructura de datos:** Valorar JSON-LD (Organization, WebSite, SoftwareApplication para extensiones/apps) para rich results en buscadores.
- **Legal en español:** Si tienes tráfico hispano, considerar versiones ES de terms, privacy y refund en `es/terms.html`, etc., y enlazarlas desde el footer y el selector de idioma.

---

## 7. Performance y CSS

### 7.1 Fuentes

- Google Fonts se cargan con `@import` en `style.css`. Un `@import` bloquea el render hasta que se resuelve.
- **Recomendación:** Sustituir por `<link rel="preconnect" href="https://fonts.googleapis.com">` y `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` en el `<head>`, y cargar la hoja de fuentes con `<link rel="stylesheet">` desde el HTML (o usar `font-display: swap` si ya está en la URL de Google Fonts).

### 7.2 Cache y versionado

- Se usa `?v=2.0` / `?v=2.1` en CSS. Bien para cache busting; al hacer cambios, incrementar la versión.

### 7.3 Animaciones

- La marquesina usa `animation: scroll-x 30s linear infinite`. En dispositivos lentos o con `prefers-reduced-motion: reduce` conviene desactivar o simplificar (por ejemplo `animation: none` y mostrar el contenido estático).

---

## 8. Mantenibilidad y código

### 8.1 Duplicación HTML

- Header, footer y bloques repetidos (nav, legal, productos) están copiados en cada HTML. Cualquier cambio (por ejemplo un enlace nuevo) obliga a tocar muchos archivos.
- **Recomendación a medio plazo:** Si el proyecto crece, valorar un generador estático (11ty, Hugo, etc.) o un mínimo de JS que cargue header/footer desde fragmentos, para una sola fuente de verdad.

### 8.2 CSS

- **Typo en `style.css`:** Líneas 482–483: `.marquée-track` (con acento) y `.marquee-track`. El HTML usa `class="marquee-track"`; la regla con acento es redundante y puede causar confusión; se puede dejar solo `.marquee-track`.
- **Variables no usadas:** Revisar si `--text-heading` o `--text-body` se usan; en `tg-grabber-pro.html` hay un `style="color: var(--text-heading)"` pero en `:root` no aparece definida (sí hay `--text-main`, `--text-muted`). Unificar nombres o definir las que falten.
- **Estilos inline:** En "Manual Installation" (tg-grabber-pro) y en el CTA del changelog hay bastantes estilos inline. Mover a clases en `product.css` o `changelog.css` para mantener consistencia y facilitar cambios.

### 8.3 Script

- El IntersectionObserver para `.reveal` está inline en `index.html` y `es/index.html`. Las páginas de producto y changelog no lo incluyen, por lo que en esas páginas los elementos con clase `reveal` no se animan. Decisión: o bien añadir el mismo script en todas las páginas que usen `.reveal`, o extraerlo a un `js/reveal.js` y cargarlo donde haga falta.

---

## 9. Documentación y proyecto

- No hay `README.md`. Sería útil un README breve con: descripción del proyecto, estructura de carpetas (raíz EN, `es/` ES, `css/`, `img/`, `downloads/`), cómo correr localmente (por ejemplo `npx serve .` o abrir `index.html`), y que el dominio custom está en `CNAME` para GitHub Pages.
- No hay `.gitignore` explícito; si en el futuro añades node_modules o archivos locales, conviene tenerlo.

---

## 10. Checklist de acciones recomendadas

### Inmediatas (enlaces y anclas)

- [ ] Cambiar todos los `#product` a `#products` (hero home EN/ES, nav en legal, tg-grabber-pro, etc.).
- [ ] Sustituir `href="#"` del botón Install/Chrome Web Store por URL real o por CTA alternativo (ZIP / "Coming soon").
- [ ] En footer de tg-grabber-pro y commanddock (EN/ES): enlazar "TG Media Grabber Pro" a `tg-grabber-pro.html` y "CommandDock" a `commanddock.html`.

### Corto plazo (UX y a11y)

- [ ] Añadir skip link y `<main id="main">` en todas las páginas.
- [ ] Definir estilos `:focus-visible` para enlaces y botones.
- [ ] Añadir `prefers-reduced-motion` para la marquesina (y en general para animaciones).
- [ ] Unificar header en páginas legales (redes + selector de idioma).

### Medio plazo (SEO y performance)

- [ ] Añadir `og:image` y `twitter:image` y `<link rel="canonical">` en todas las páginas.
- [ ] Preconnect a Google Fonts y cargar fuentes sin bloquear con `@import`.
- [ ] Opcional: JSON-LD para Organization / WebSite / SoftwareApplication.

### Opcional (mantenibilidad)

- [ ] Corregir/eliminar `.marquée-track` y unificar variables CSS (`--text-heading` / `--text-body`).
- [ ] Mover estilos inline de "Manual Installation" y similares a clases en CSS.
- [ ] Extraer script de reveal a `js/reveal.js` y cargarlo donde se use `.reveal`.
- [ ] Añadir `README.md` y, si aplica, `.gitignore`.

---

## 11. Conclusión

El sitio tiene una base sólida: diseño coherente, responsive y contenido claro. Los problemas más urgentes son **enlaces rotos** (`#product` vs `#products`, `href="#"` en CTAs y footer), que afectan conversión y confianza. Corregirlos y aplicar las mejoras de accesibilidad y SEO anteriores dejará el proyecto en muy buen estado para un sitio estático desplegado en GitHub Pages. Si quieres, puedo proponerte los cambios concretos archivo por archivo (diffs) para cada punto del checklist.
