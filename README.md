# Code Aeternum — Website

Sitio web estático de **Code Aeternum**: extensión Chrome [TG Media Grabber Pro](https://chromewebstore.google.com/detail/tg-media-grabber-pro/opbopilodjdiblbohlkffmmgijafcigf), app de escritorio [CommandDock](https://github.com/codeaeternum/commanddock) y marca de herramientas de desarrollo.

- **URL:** [codeaeternum.com](https://codeaeternum.com)
- **Despliegue:** GitHub Pages (dominio custom vía `CNAME`).

## Estructura

- **Raíz:** páginas en inglés (`index.html`, `tg-grabber-pro.html`, `commanddock.html`, legal, changelogs).
- **`es/`:** mismas páginas en español.
- **`css/`:** `style.css` (global), `product.css` (producto), `changelog.css` (changelogs).
- **`js/`:** `reveal.js` (scroll reveal en home).
- **`img/`**, **`downloads/`:** recursos estáticos.

## Desarrollo local

No hay build. Servir la carpeta como está:

```bash
npx serve .
```

O abrir `index.html` directamente en el navegador (algunas rutas pueden fallar sin servidor).

## Documentación

- **`GEMINI.md`** — Contexto del proyecto, convenciones y enlaces para IA o referencia futura.
- **`AUDITORIA_PROYECTO.md`** — Auditoría detallada (enlaces, a11y, SEO, mantenibilidad) y checklist.

## Licencia

© 2026 Code Aeternum. All rights reserved.
