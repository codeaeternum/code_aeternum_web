# Plan Maestro de Mejoras — codeaeternum.com

> Auditoría integral ejecutada el 9-nov-2026 con 6 agentes en paralelo sobre el
> estado real de `main` (commit `5ebe883`). Supersede a `AUDITORIA_PROYECTO.md`
> y `AUDIT_REPORT.md` (mar-2026), que quedan como snapshots históricos en
> `docs/audits/`.

## Resumen ejecutivo

El sitio tiene **buena base** (semántica correcta, cero trackers, `rel=noopener`
en todos los `_blank`, `prefers-reduced-motion`, hreflang bien hecho en las 6
páginas bilingües, cero enlaces internos rotos). Los problemas reales son de
**proceso, no de talento**: todo se mantiene a mano en ~21 HTML con header/footer
duplicados que ya divergieron en 7 variantes, sin CI que atrape regresiones, y
cada auditoría manual anterior generó docs que se volvieron obsoletos.

Los 5 hallazgos más graves:

1. **FreshTrack invisible**: el producto más activo (v1.12, releases casi
   diarios) no está enlazado desde ninguna página, no está en el sitemap, y sus
   páginas usan clases CSS que no existen → se renderizan rotas. Además la web
   ofrece el DMG 1.0 mientras el manifiesto de actualización declara 1.12 con
   `downloadUrl: null`.
2. **Previews sociales rotas**: `og:image` apunta a un PNG de **32×32 px** en 15
   páginas; las redes exigen ≥200×200 (ideal 1200×630).
3. **EXE de 92 MB trackeado en git** (`downloads/CommandDock-1.0.0-portable.exe`):
   el `.gitignore` está en UTF-16 y git no lo parsea → el binario se despliega a
   Pages y el repo pesa 200 MB. Nadie lo enlaza.
4. **Violación WCAG nivel A**: marquee infinito sin pausa (2.2.2), contraste
   `.kofi-btn` ~2.5:1, `.hero-note`/`downloads-note` ~3.5:1, bloque ES de
   `freshtrack-privacy.html` sin `lang="es"`.
5. **Fecha imposible publicada**: TG Grabber v4.3 fechada "March 2025" sobre
   v4.1 "February 2026" (EN y ES).

Infra en vivo: Cloudflare proxy → GitHub Pages (legacy build). Sin headers de
seguridad (HSTS, CSP, X-Frame-Options…). `https_enforced` desactivado en Pages.
Sin `.github/` — cero CI, cero validación, deploy directo de `main`.

---

## Estado por área (condensado de los 6 informes)

### SEO técnico
- Meta description ausente en `privacy.html`, `terms.html`, `refund-policy.html` (indexadas).
- OG incompleto en 10 páginas (4 changelogs, 3 legales, 3 blackjack, freshtrack-privacy — esta última sin ninguno).
- Twitter Cards a medias: solo TG/CommandDock las tienen (sin `twitter:image`); freshtrack solo `card`+`site`.
- Sitemap sin `lastmod`/`priority`; faltan `freshtrack.html` y `freshtrack-privacy.html`.
- Cero JSON-LD (sin `Organization`, `WebSite`, `SoftwareApplication`, `BreadcrumbList`).
- Titles >60c en 5 páginas (truncan en SERP); descriptions >160c en 3 ES.
- `og:url` home sin barra; falta `og:site_name`, `og:locale`, `og:image:alt`.
- Enlaces internos a `index.html` en vez de `/`.

### Accesibilidad (WCAG)
- **Nivel A**: marquee sin mecanismo de pausa (2.2.2).
- Contraste: `.kofi-btn` ~2.5:1 (6 páginas); `opacity:.7` sobre `--text-muted` → ~3.5:1; borde `.cta-secondary` 1.2:1 (1.4.11); `.cta-button` 4.59:1 pasa justo.
- `freshtrack-privacy.html`: bloque ES sin `lang`, sin skip-link, 2×`<h1>`.
- Blackjack ×3 + freshtrack-privacy: doble `<h1>` por bilingüe-en-una-página.
- ~50 iconos emoji y SVGs decorativos sin `aria-hidden`; mitad del marquee duplicada se lee dos veces.
- Logo `alt="Code Aeternum"` duplica el wordmark; iconos de producto `alt` redundante junto a su `<h2>`.
- `main` sin `tabindex="-1"` (skip-link no mueve foco en Safari); `:focus-visible` solo cubre 4 selectores (faltan `.download-card`, `.logo`, `.link-primary`, legales).
- Sin aviso "opens in new tab" en externos; `.lang-switch` sin `lang`/`hreflang`.
- Footer links ~22.5px < 24px (SC 2.5.8); `<time>` sin `datetime`.

### Performance
- Screenshots PNG sin optimizar ni `width/height` (CLS): `commanddock-screenshot.png` 1689×1277 (~200KB), `promo-screenshot.png` 1400×870 (~179KB), sin `srcset`.
- Google Fonts vía `@import` en `style.css:4` — cadena bloqueante; preconnect ya existe pero no resuelve el descubrimiento tardío. 8 pesos declarados, se usan 5.
- `logo.png` (1.0 MB, 2160²) y `logo-sin-nombre.png` (845 KB) **huérfanos** — cero referencias.
- Iconos 512² servidos a 64–200px (vunari, commanddock) — desperdicio ~98% de píxeles a 64px.
- `?v=` manual divergido: style 2.0/2.1, product 2.0/2.1/2.2; `reveal.js` sin versión.
- `product.css` se carga en changelogs para solo 2 clases.
- Preload desperdiciado en logo 32×32 (1.6 KB).
- Peso estimado: index ~130-185KB crítico (bien); commanddock ~800KB-2MB total (los screenshots son el 80%).

### Diseño / UI-UX
- Tokens solo de color; radios (7 valores), font-sizes (>25 literales), alphas de cobre (~10) hardcodeados.
- `.product-section`/`.fineprint`/`.error-hero` **usadas pero no definidas** → FreshTrack/404 sin estilo.
- Headers/footers en ≥6/7 variantes (divergencias de productos, iconos sociales, lang-switch, `h3`/`h4`).
- Sin menú móvil: el header ocupa ~15% del viewport con 6 links en wrap.
- Solo 2 breakpoints; rango 481-768 salta de 3→1 columnas.
- Footer móvil: links inline-flex rompen la lista vertical.
- Dark-only coherente; falta `theme-color`, `color-scheme`, apple-touch-icon, manifest.
- `.legal-content` y `#downloads` quedan bajo el header fijo (sin padding/scroll-margin).
- `<code>` con 3 estilos; 4 variantes de badge; feature-card/value-card duplicadas.
- Sin `:active` en botones; `.marquée-track` typo persistente desde mar-2026.
- Iconos sociales 18 vs 20px; marquee sin pausa en hover.

### Contenido / i18n
- **No existen** `es/terms.html`, `es/privacy.html`, `es/refund-policy.html` — todos los footers ES llevan a legal EN (embudo ES termina en inglés).
- `freshtrack.html` sin versión ES; `freshtrack-privacy.html` embebe ES sin `lang`.
- `blackjack-poker-lab/` sin landing de producto (solo legal), patrón `#es` divergente del `es/` del sitio.
- Changelog TG v4.3: "March 2025" → debe ser 2026 (EN+ES). Fechas con formato inconsistente.
- Versiones desincronizadas: freshtrack.html ofrece DMG 1.0 vs JSON v1.12; CommandDock anuncia 1.0.1 con assets 1.0.0 (funciona, cosmético).
- Copy: "remisión" sin glosa en EN; negación ambigua `es/vunari.html:121`; anglicismos dispersos (media/output/custom/workspace); superlativos sin respaldo ("most powerful", "who trust").
- "Soporte" vs "Contacto" en footers ES de changelogs.
- Fechas legales dispares (feb/jul/oct-2026); legal habla solo de "browser extensions", ignora apps desktop/iOS/Mac.
- `© 2026` hardcodeado en 17 archivos.

### Ingeniería / procesos
- ~40% del HTML es boilerplate duplicado (~1.300-1.600 líneas); cambiar el footer cuesta 12-20 ediciones y ya falló.
- Sin build/SSG/includes; sin `package.json`; sin `.github/`; sin `.gitignore` raíz; sin `.nojekyll`.
- `reveal.js`: fallback sin IntersectionObserver usa `NodeList.forEach` — falla justo en los navegadores que debe proteger → contenido `.reveal` invisible.
- `freshtrack-mac-version.json`: API implícita sin documentar ni automatizar; `downloadUrl:null` + desfase 1.0/1.12.
- Docs obsoletos: GEMINI.md (email viejo, ZIPs inexistentes, sin Vunari/FreshTrack), AUDIT_REPORT/AUDITORIA sin estado.
- `{{branch}}`/`{{host}}` literales en commanddock.html — fragilidad si se adopta Jekyll/build.
- 11 enlaces a `codeaeternum.github.io` sin `target="_blank"` (inconsistente con los otros ~95).
- Ramas remotas huérfanas (`agent/*`, `codex/*` ×3); commits sin convención, mezcla EN/ES.
- **Copia divergente**: `~/Proyectos_Sincronizados/code_aeternum_web/` (sin .git, versión de julio) — riesgo de editar/subir lo equivocado.
- Cloudflare delante: email-obfuscation ON (reescribe mailtos con JS), sin headers de seguridad configurables desde Pages (hacerlos en CF Transform Rules), Brotli/Early Hints por verificar.
- GitHub Pages: `https_enforced=false`, build legacy (Jekyll implícito sin `.nojekyll`).

---

## Roadmap por fases

### Fase 0 — Fixes críticos (implementada en esta iteración, PR `improve/audit-2026-11`)
Corregir todo lo que es bug objetivo o riesgo inmediato, sin decisiones de producto:

- **Contenido/SEO** (branch `fix/content-seo-a11y`):
  - Fecha changelog v4.3 2025→2026 (EN+ES); `<time datetime>` en changelogs.
  - `meta description` en 3 legales; OG completo + `twitter:*` uniforme en todas las páginas; `og:image` → assets ≥1200×630.
  - JSON-LD: `Organization`+`WebSite` en homes, `SoftwareApplication` en productos.
  - `width/height` en screenshots; `alt=""` en logo e iconos redundantes; `aria-hidden` en SVGs/emoji/marquee-duplicado; pausa de marquee en hover/focus.
  - `lang="es"` en bloque ES de freshtrack-privacy + 404 EN marcado; 2º `<h1>`→`<h2>`; skip-link donde falte; `main tabindex="-1"`; `aria-current="page"`.
  - Header/footer canónicos unificados en las 21 páginas; FreshTrack en home/footer/sitemap (+`lastmod`); "Soporte"→"Contacto"; fixes de copy señalados; `<link>` de fuentes en heads.
- **CSS** (branch `fix/css-design-system`): definir clases fantasma; contraste kofi/cta-secondary/notas; `:focus-visible` global; tokens de radios/espaciados; purga de CSS muerto; footer móvil vertical; `scroll-margin`; `code` unificado; `:active`; `hr`; breakpoint intermedio; quitar `@import` de fuentes.
- **Infra** (branch `chore/infra-repo-hygiene`): `.gitignore` UTF-8 raíz + `git rm --cached` del EXE; `.nojekyll`; fix `reveal.js`; CI mínimo (html-validate + link check); generar `og-image.png`/apple-touch-icon/manifest; docs actualizados; este plan.

### Fase 1 — Completitud de producto (requiere decisiones)
- [ ] **Decisión: FreshTrack público** → crear `es/freshtrack.html` + `es/freshtrack-privacy.html`; o si es solo para App Store → `noindex` (ya se optó por publicarlo en Fase 0; falta ES).
- [ ] **Legal ES**: `es/terms.html`, `es/privacy.html`, `es/refund-policy.html` + hreflang + footers ES.
- [ ] **Landing `/blackjack-poker-lab/`** o retirar del sitemap.
- [ ] Actualizar textos legales para cubrir apps desktop/iOS/Mac (hoy solo "browser extensions"); fechas de actualización unificadas.
- [ ] Releases: subir DMG FreshTrack 1.12, actualizar enlace + `downloadUrl` del JSON; renombrar assets CommandDock coherentes.
- [ ] og-images por producto (hoy hay screenshots para TG/CD; diseñar cards dedicadas).

### Fase 2 — Imagen y rendimiento
- Screenshots → WebP/AVIF ~1200px + `srcset`/`sizes`; iconos a 256px.
- Self-host de fuentes (Outfit 400/500/600/700 + Cormorant 600 en woff2) → cero terceros, preload del crítico.
- `theme-color`, `site.webmanifest`, `color-scheme: dark`, set completo de iconos.
- Menú móvil (hamburguesa sin JS) o nav scrollable; estados activos.
- Unificación de badges/cards/code bajo `.badge`/`.card` base.
- Quitar EXE del historial (reescritura) si el peso de clone importa (~113MB .git hoy).

### Fase 3 — Procesos y plataforma
- **SSG (decisión mayor)**: 11ty/Astro con layout único + data-driven products + i18n por colecciones → elimina la duplicación de raíz, sitemap/RSS automáticos, `?v` por hash. Alternativa mínima: script de includes (~80 líneas) + check de drift en CI. Si se usa Jekyll: envolver `{{...}}` de commanddock en `{% raw %}`.
- Automatizar `freshtrack-mac-version.json` desde GitHub Releases (Action en tag `freshtrack-mac-*`).
- RELEASES.md con checklist de release de sitio y apps; Conventional Commits.
- Cloudflare: Transform Rule con headers (HSTS, X-Content-Type-Options, X-Frame-Options/	frame-ancestors, Referrer-Policy, Permissions-Policy), Brotli, Early Hints; evaluar apagar email-obfuscation (rompe mailtos con JS inyectado).
- GitHub: `https_enforced=true` en Pages; borrar ramas `agent/*`/`codex/*`; protección de `main` (requerir CI).
- Resolver la copia divergente en `~/Proyectos_Sincronizados/code_aeternum_web/` (archivar o borrar; canon = repo git).
- Analytics privacy-first opcional (CF Web Analytics / Plausible) — hoy cero métricas.
- `Disallow: /freshtrack-mac-version.json` opcional en robots.

### Métricas de éxito
- Lighthouse: SEO 100, A11y ≥95 (hoy falla contraste + marquee), CLS ~0, LCP <2.5s en 4G.
- Preview social correcto en Slack/X/FB debugger en todas las páginas.
- CI verde: html-validate + lychee sin errores en cada PR.
- Peso del clone <60MB tras sacar el EXE.
- Cambio de footer = 1 archivo (tras Fase 3).

## Convenciones que quedan
- Canon del proyecto = repo git `codeaeternum/code_aeternum_web` (no la copia Syncthing).
- Toda página indexable lleva: title ≤60c, description ≤155c, canonical, OG completo, twitter:*, og:image ≥1200×630.
- Un solo `<h1>` por página; bloques en otro idioma con `lang` explícito.
- Nada se mantiene a mano en más de 2 sitios (header/footer/productos via build o checklist RELEASES.md).
