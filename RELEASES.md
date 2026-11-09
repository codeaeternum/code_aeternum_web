# RELEASES — Checklists

Procedimiento de publicación para el sitio y para las apps. El sitio se despliega
automáticamente: **push a `main` → GitHub Pages** (sin build, `.nojekyll`).

---

## 1. Release del sitio (codeaeternum.com)

Checklist al mergear cambios a `main`:

- [ ] **Cache busting `?v=`**: si cambiaste `css/*.css` o `js/*.js`, sube el query
  `?v=` en **todas** las páginas que lo referencian (convención actual: `?v=3.0`,
  un solo número para todo el sitio — no divergir por archivo).
- [ ] **`sitemap.xml`**: actualiza `<lastmod>` de las páginas tocadas; añade
  `<url>` si creaste páginas nuevas (recuerda `freshtrack.html` y
  `freshtrack-privacy.html` si todavía no están).
- [ ] **Páginas nuevas**: title ≤60c, meta description ≤155c, canonical,
  OG completo + `og:image` (usar `/img/og-image.png` 1200×630), twitter:*,
  hreflang si tiene versión ES, skip-link, `<main id="main">`, un solo `<h1>`.
- [ ] **Header/footer**: copiar el bloque canónico (los ~20 HTML duplican
  header/footer a mano — cualquier cambio de footer cuesta ~12-20 ediciones;
  anótalo en el PR si tocaste uno).
- [ ] **CI verde**: el workflow `ci` (`.github/workflows/ci.yml`) corre
  `html-validate` + chequeo de enlaces internos con `linkinator` en cada push/PR
  a `main`. Revisa que pase en la PR antes de mergear; para correrlo en local:

  ```bash
  npx --yes html-validate@latest "**/*.html"
  npx --yes linkinator@latest $(git ls-files '*.html' | tr '\n' ' ') --recurse \
    --skip "^https?://(?!localhost)(?!127\.0\.0\.1)" --skip "^mailto:" --skip "^tel:"
  ```

- [ ] **Binarios**: nada de `*.exe`/`*.dmg`/`*.zip` en el repo (`.gitignore` los
  excluye). Distribuir por GitHub Releases y enlazar la URL del asset.
- [ ] **Post-deploy**: verificar en producción la página tocada, una preview
  social si cambiaste OG (`https://cards-dev.twitter.com/validator` o
  Facebook Sharing Debugger), y que Cloudflare sirva la versión nueva
  (purge cache si el `?v=` no basta para HTML).

## 2. Release de app: FreshTrack (macOS)

El sitio expone `freshtrack-mac-version.json`, que la app consulta para saber si
hay actualización. Formato actual:

```json
{
  "version": "1.12",
  "minMacOS": "14.0",
  "note": "<texto de novedades>",
  "downloadUrl": null
}
```

Checklist al publicar una versión nueva:

- [ ] **Tag + GitHub Release**: crea la release `freshtrack-mac-X.Y` en el repo
  correspondiente y sube el DMG (`FreshTrack-X.Y.dmg`) como asset.
- [ ] **`freshtrack-mac-version.json`** (raíz del sitio):
  - `version` → la nueva versión (p. ej. `"1.13"`).
  - `note` → novedades de la release (texto plano).
  - `downloadUrl` → URL **real** del asset DMG en la release
    (`https://github.com/<owner>/<repo>/releases/download/freshtrack-mac-X.Y/FreshTrack-X.Y.dmg`).
    Hoy está en `null` — es la deuda principal (ver `PLAN_MEJORAS.md`, Fase 1).
  - `minMacOS` → solo si cambia el requisito.
- [ ] **`freshtrack.html`**: el enlace de descarga de la página debe apuntar al
  DMG de la release nueva (hoy ofrece una versión antigua — alinear con el JSON).
- [ ] **Changelog/notas** si la página las muestra.
- [ ] **Verificar**: abrir `https://codeaeternum.com/freshtrack-mac-version.json`
  tras el deploy y comprobar `version` + `downloadUrl`; probar el enlace de
  descarga desde `freshtrack.html`.
- [ ] **CI verde** antes de mergear (el chequeo de enlaces valida los `<a>`
  internos; los externos a GitHub Releases se verifican a mano).

### Nota sobre `freshtrack-mac-version.json`

Es una **API implícita**: la app lo lee en producción, así que no cambiar claves
ni formato sin coordinar con la app. La automatización ideal (Fase 3 del plan)
es una Action que regenere este JSON al publicar el tag `freshtrack-mac-*`.
Hasta entonces se actualiza a mano con el checklist de arriba.

## 3. Otras apps (cuando haya release)

Mismo patrón que FreshTrack: GitHub Release con assets, enlace en la página del
producto, y si la app tiene manifiesto de actualización propio, actualizarlo.
CommandDock publica sus binarios en `github.com/codeaeternum/commanddock`
(renombrar assets con el número de versión consistente — deuda registrada en
`PLAN_MEJORAS.md`).
