# Changelog

All notable changes to svelte-webcomponent will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-11-25

### Changed
- Bumped all dependencies to latest stable versions:

  | Package | From | To |
  |---|---|---|
  | `@sveltejs/vite-plugin-svelte` | ^7.1.2 | ^7.3.2 |
  | `@tsconfig/svelte` | ^5.0.8 | ^5.0.9 |
  | `@types/node` | ^25.9.3 | ^26.6.10 |
  | `svelte` | ^5.56.3 | ^5.59.2 |
  | `svelte-check` | ^4.6.0 | ^4.7.8 |
  | `terser` | ^5.45.0 | ^5.51.4 |
  | `vite` | ^8.0.16 | ^8.3.8 |

- `MyComponent.wc.svelte` rewritten as a current reference: runes (`$props()`) instead of
  legacy `export let`, typed `props` config (`count` as Number, `name` reflected), and a
  `count-change` event dispatched through `$host()`.
- Runes mode enabled for the whole project (`compilerOptions.runes: true`).
- Custom elements are selected per file by the function form of
  `compilerOptions.customElement` in `svelte.config.js`. `vite.config.ts` now has one
  `svelte()` plugin instance and one shared config for dev and build.
- Bundle size is now 44.67 kB (gzip 17.13 kB) ES, 44.00 kB (gzip 17.10 kB) UMD. About
  10 kB of that came with Svelte 5.59.0 (custom renderer API); 5.58.0 built the old
  component at 34.22 kB. Output is still fully minified.

### Removed
- `rollupOptions.external` / `globals` for `svelte` and `svelte/internal` in `vite.config.ts`.
  Svelte 5 imports `svelte/internal/client`, so nothing was ever externalized - the runtime
  is bundled, which is what a standalone web component needs.

### Fixed
- `src/global.d.ts`: dropped the `SvelteComponentTyped` shim (removed in Svelte 5)
  and the stale `rollup-plugin-terser` module declaration.
- `web-components.ts` comment showed Svelte 3 syntax (`<svelte:options tag>`).

### Not changed
- TypeScript stays on ^6.0.3: `svelte-check` 4.7.8 declares peer `typescript ^5 || ^6`.
  TypeScript 7 works only via `svelte-check --tsgo` with an extra `@typescript/native` package.
- Terser stays the minifier: Vite's default (Oxc) produced a 60.93 kB ES file vs 43.67 kB.

### Verified
- `npm install` clean, 0 vulnerabilities.
- `npm run build` and `npm run check` pass (0 errors, 4 pre-existing unused-CSS warnings).
- Built bundle loaded in headless Chromium: element registers, renders, `count` attribute
  converts to a number, `name` property reflects to the attribute, `count-change` fires.

## [0.1.0] - 2026-06-18

### Changed
- Bumped all dependencies to latest stable versions:

  | Package | From | To |
  |---|---|---|
  | `@sveltejs/vite-plugin-svelte` | ^5.1.1 | ^7.1.2 |
  | `@tsconfig/svelte` | ^5.0.5 | ^5.0.8 |
  | `@types/node` | ^22.18.13 | ^25.9.3 |
  | `svelte` | ^5.43.0 | ^5.56.3 |
  | `svelte-check` | ^4.3.3 | ^4.6.0 |
  | `typescript` | ^5.9.3 | ^6.0.3 |
  | `vite` | ^6.4.1 | ^8.0.16 |

- Replaced the `@rollup/plugin-terser` output plugin with Vite's native
  `build.minify: 'terser'` (+ `terserOptions`). Under Vite 8 (Rolldown) the
  output plugin no longer minified the ES chunk, leaving it ~42 kB; the native
  path minifies both ES and UMD reliably.

### Removed
- `@rollup/plugin-terser` dependency (superseded by native Vite minification).
- Custom `minifyEs()` esbuild plugin in `vite.config.ts` — `esbuild` is no
  longer bundled with Vite 8 (Rolldown), so the import broke the build. Native
  minification covers the same case.

### Added
- `terser` as a direct devDependency (required by Vite's `minify: 'terser'`).

### Fixed
- Build no longer crashes on `vite build` (`ERR_MODULE_NOT_FOUND: esbuild`).
- Removed stale `rollup-plugin-terser` / `@rollup/plugin-terser` entries from
  the `types` arrays in `tsconfig.app.json` and `tsconfig.node.json`.
- `npm run check` passes with 0 errors (4 pre-existing unused-CSS warnings only).

### Verified
- `npm install` clean (no peer-dependency conflicts after lockfile regeneration).
- `npm run build` → `dist/my-web-components.es.js` 32.96 kB (gzip 12.72 kB),
  `dist/my-web-components.umd.js` 32.46 kB (gzip 12.75 kB).
- `npm run check` → 0 errors.

## [0.0.1] - 2025-11

### Added
- `preview-index.html` template for production preview
- Automatic preview template copying during build
- CHANGELOG.md for version tracking

### Changed
- **BREAKING:** Replaced deprecated `rollup-plugin-terser` with `@rollup/plugin-terser`
- Updated all dependencies to latest stable versions
- Updated README.md with accurate bundle sizes and workflow

### Fixed
- Web components now render correctly in production preview mode
- Components load properly when served from dist/ folder
- Eliminated deprecated package warnings during install
- Resolved security vulnerabilities in dependencies
- Build process now automatically copies preview template

## [0.0.0] - 2025-10-29

### Added
- Initial release
- Svelte 5 web component boilerplate
- TypeScript support
- Vite 6 build configuration
- ES and UMD output formats
