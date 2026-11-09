# Code Aeternum — Website

Sitio web estático de **Code Aeternum**, marca de software independiente.

- **URL:** [codeaeternum.com](https://codeaeternum.com)
- **Despliegue:** push a `main` → GitHub Pages (build estático, `.nojekyll` incluido). Dominio custom vía `CNAME`, detrás de Cloudflare.
- **Contacto:** [soporte@codeaeternum.com](mailto:soporte@codeaeternum.com)

## Productos

| Producto | Página | Descripción |
|---|---|---|
| **Vunari** | `vunari.html` | Herramienta de productividad/escritorio. |
| **TG Media Grabber Pro** | `tg-grabber-pro.html` | Extensión Chrome para descargar medios de Telegram Web en bulk. |
| **CommandDock** | `commanddock.html` | App de escritorio (panel de comandos contextual para desarrolladores). |
| **FreshTrack** | `freshtrack.html` | App macOS; versionado vía `freshtrack-mac-version.json`. |
| **Blackjack & Poker Lab** | `blackjack-poker-lab/` | Simulador/lab de blackjack y póker (páginas legales/soporte). |

## Estructura del repo

- **Raíz:** páginas en inglés (`index.html`, páginas de producto, legal, changelogs, `404.html`), `sitemap.xml`, `robots.txt`, `site.webmanifest`, `CNAME`, `freshtrack-mac-version.json`.
- **`es/`:** espejo en español (index, vunari, tg-grabber-pro, commanddock y sus changelogs).
- **`blackjack-poker-lab/`:** `privacy/`, `terms/`, `support/` (EN/ES por fragmento `#es`).
- **`css/`:** `style.css` (global), `product.css` (producto), `changelog.css` (changelogs).
- **`js/`:** `reveal.js` (scroll reveal con IntersectionObserver).
- **`img/`:** favicon, iconos de producto, screenshots, `og-image.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`.
- **`downloads/`:** carpeta de descargas; los binarios (`*.exe`, `*.dmg`, `*.zip`) NO se commitean — se distribuyen por GitHub Releases.
- **`docs/audits/`:** snapshots históricos de auditorías (superseded por `PLAN_MEJORAS.md`).
- **`.github/workflows/ci.yml`:** CI — validación HTML (`html-validate`) y chequeo de enlaces internos (`linkinator`).

## Desarrollo local

No hay build. Servir la carpeta como está:

```bash
npx serve .
```

O abrir `index.html` directamente (algunas rutas pueden fallar sin servidor).

Validaciones locales (las mismas que corre CI):

```bash
npx --yes html-validate@latest "**/*.html"
npx --yes linkinator@latest $(git ls-files '*.html' | tr '\n' ' ') --recurse \
  --skip "^https?://(?!localhost)(?!127\.0\.0\.1)" --skip "^mailto:" --skip "^tel:"
```

## Convenciones

- **Cache busting:** los assets versionados usan query `?v=X.Y` (convención actual: `?v=3.0`). Incrementar al cambiar CSS/JS.
- **Idiomas:** EN en raíz, ES en `es/`; páginas bilingües llevan `hreflang` y canonical.
- **Binarios:** nunca commitear instaladores; subirlos a GitHub Releases y enlazarlos (ver `RELEASES.md`).

## Documentación

- **`PLAN_MEJORAS.md`** — plan maestro de mejoras (estado actual).
- **`GEMINI.md`** — contexto del proyecto, convenciones y decisiones para IA/referencia.
- **`RELEASES.md`** — checklist de releases del sitio y de apps.
- **`docs/audits/`** — auditorías históricas (mar-2026, superseded).
- **`COMANDOS_IMPECCABLE.md`** — referencia de comandos de diseño.

## Licencia

© 2026 Code Aeternum. All rights reserved.
