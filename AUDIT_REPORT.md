# Auditoría de calidad — Code Aeternum Web

**Fecha:** 3 de marzo de 2026  
**Tipo:** /audit — Accesibilidad, rendimiento, sistema de diseño, responsivo.  
**Referencia:** [COMANDOS_IMPECCABLE.md](COMANDOS_IMPECCABLE.md)

---

## Resumen ejecutivo

| Área            | Estado      | Severidad |
|-----------------|------------|-----------|
| Accesibilidad   | Mejorable  | Media     |
| Rendimiento     | Aceptable  | Baja      |
| Sistema de diseño | Corregido | —         |
| Responsivo      | Correcto   | —         |

---

## 1. Accesibilidad (a11y)

### ✅ Hecho
- Skip link en todas las páginas, oculto con `left: -9999px` hasta `:focus`.
- `<main id="main">` en todas las páginas.
- `lang` correcto (en/es) en `<html>`.
- `aria-label` en iconos de redes (X, GitHub).
- Contraste oscuro con texto claro.
- `:focus-visible` en nav, CTAs y footer.
- `prefers-reduced-motion: reduce` para la marquesina.

### ⚠️ Severidad media
- **Landmarks:** No hay `role="banner"` en header ni `role="contentinfo"` en footer; los lectores de pantalla se apoyan en `<header>`/`<footer>`, suficiente pero mejorable.
- **Encabezados:** Revisar que no falte un `<h2>` antes de `<h3>` en changelogs o legal (jerarquía lógica).

### Recomendaciones
- Añadir `role="banner"` al `<header>` y `role="contentinfo"` al `<footer>`.
- Revisar orden h1 → h2 → h3 en páginas legales y changelog.

---

## 2. Rendimiento

### ✅ Hecho
- Preconnect a `fonts.googleapis.com` y `fonts.gstatic.com` en todas las páginas.
- `loading="lazy"` en al menos una imagen (promo en TG Grabber Pro).
- Sin JS pesado; solo `reveal.js` (IntersectionObserver).
- Cache busting con `?v=2.0` en CSS.

### ⚠️ Severidad baja
- **Fuentes:** Siguen cargándose vía `@import` dentro de `style.css`; el preconnect ayuda pero el orden óptimo sería cargar la hoja de fuentes con `<link>` en el HTML (o usar `font-display: swap` si ya está en la URL de Google Fonts).
- **og:image:** Se usa el logo 32×32; para redes es mejor una imagen 1200×630 (p. ej. `img/og-image.png`).

### Recomendaciones
- Valorar cargar la URL de Google Fonts como `<link rel="stylesheet">` en el `<head>` en lugar de `@import` en CSS.
- Añadir `img/og-image.png` 1200×630 y actualizar `og:image` en todas las páginas.

---

## 3. Sistema de diseño (temas / consistencia)

### ✅ Corregido — Variable CSS inexistente
En **tg-grabber-pro.html** y **es/tg-grabber-pro.html** se usan en estilos inline `var(--text-heading)` y `var(--text-body)`. **Corrección aplicada:** se añadieron en `:root` de `style.css`:
- `--text-heading: #fff;`
- `--text-body: #e8e6e3;`

### ✅ Resto
- Paleta (primary, accent, bg-dark, border) coherente.
- Tipografías Outfit y Cormorant Garamond unificadas.
- Botones y cards siguen las mismas clases (.cta-button, .support-btn, .value-card).

---

## 4. Diseño responsivo

### ✅ Correcto
- Breakpoints en **768px** y **480px** en `style.css` y `product.css`.
- Header pasa a sticky y columna en móvil.
- Grids de productos/valores a 1 columna en móvil.
- Footer en columna y centrado.
- Marquesina y hero se adaptan.

### Sin hallazgos
No se detectan overflow horizontal ni elementos fijos que rompan en móvil.

---

## 5. Otros hallazgos

### Enlaces y navegación
- Enlaces a productos, legal y Chrome Web Store correctos.
- Ancla `#products` unificada en la home.
- Footer con enlaces a páginas de producto (no `#`).

### Documentación
- README, GEMINI.md y AUDITORIA_PROYECTO.md presentes.
- COMANDOS_IMPECCABLE.md añadido (referencia de comandos de diseño).

---

## 6. Checklist de acciones recomendadas

| Prioridad | Acción |
|-----------|--------|
| ~~Alta~~  | ~~Variables `--text-heading` y `--text-body`~~ → **Hecho** en `style.css`. |
| Media     | Añadir `role="banner"` y `role="contentinfo"` en header/footer. |
| Baja      | Imagen og 1200×630 y actualizar `og:image`. |
| Baja      | Valorar carga de fuentes con `<link>` en HTML en lugar de `@import`. |

---

## Siguientes comandos sugeridos (COMANDOS_IMPECCABLE)

- **/normalize** — Para alinear el uso de variables y estilos inline con el sistema de diseño.
- **/harden** — Si se añaden más idiomas o casos límite (texto largo, errores).
- **/optimize** — Para afinar carga de fuentes y recursos.
