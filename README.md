# Svelte Web Components Starter

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A lightweight starter template for building optimized web components with Svelte 5 and TypeScript. Produces production-ready components with:
- **45KB** minified (ES format)
- **17.1KB** gzipped
- Custom Elements v1 compliant

> Note on size: that ~17KB gzip is the Svelte runtime - a one-time cost shared by
> every component, not paid per component. Each additional component adds only
> ~0.5KB minified (~60-250 B gzipped). Ten components share that single runtime in one
> bundle, they do not pay 17KB each.

> Dependencies last bumped: **2026-11-25** (see [CHANGELOG.md](CHANGELOG.md)).

## Features

- Ultra-lightweight output
- TypeScript-first development
- Universal component format (ES + UMD)
- Built-in Vite optimizations
- CSS isolation per component
- Zero-dependency components

## Quick Start

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Usage

### Import in HTML
```html
<script type="module" src="/dist/my-web-components.es.js"></script>

<my-component name="Developer"></my-component>
```

### Preview Production Build
The build process automatically copies the preview template, so you can directly run:
```bash
npm run preview
```

### Use in JavaScript
```javascript
import { MyComponent } from './dist/my-web-components.es.js';

// Components auto-register on import
```

## Building Components

1. Create new component in `src/wc/`
```svelte
<svelte:options
  customElement={{
    tag: 'my-element',
    // Optional: attributes are strings, so declare the type of non-string props
    props: { amount: { type: 'Number' } }
  }}
/>

<script lang="ts">
  let { value, amount = 0 }: { value: string; amount?: number } = $props();

  // $host() is the element itself - use it to emit events to the outside world
  const handleClick = () =>
    $host().dispatchEvent(new CustomEvent('my-event', { detail: { amount }, bubbles: true, composed: true }));
</script>

<button type="button" onclick={handleClick}>Hello {value}</button>
```

The file name must end with `.wc.svelte` - `svelte.config.js` compiles only those
files as custom elements. Other useful options: `shadow: 'none'` (no shadow DOM, page
CSS applies) or a `ShadowRootInit` object, `reflect: true` per prop, and `extend`.
See the [Svelte custom elements docs](https://svelte.dev/docs/svelte/custom-elements).

2. Add to `src/wc/web-components.ts`
```typescript
export { default as MyElement } from './MyElement.wc.svelte';
```

3. Rebuild with `npm run build`

## Package Scripts

| Command        | Description                          |
|----------------|--------------------------------------|
| `npm run dev`  | Start dev server with HMR            |
| `npm run build`| Build production-ready components    |
| `npm run preview` | Locally preview production build |
| `npm run check` | Validate TypeScript types          |

## Technical Stack

**Core Technologies**  
- Svelte 5.59.2 (custom elements)
- TypeScript 6.0.3
- Vite 8.3.8

**Optimization Features**  
- Terser minification (Vite native)  
- Tree-shaking enabled  
- CSS auto-scoping  
- Dead code elimination  
- Gzip-ready outputs

## State of the ecosystem (checked 2026-11-25)

- **Svelte 5 is still current.** Svelte 6 is in development (milestone ~10% done), no release date.
  Planned for 6: a cleaner property/attribute split on custom elements.
- **Bundle size grew in Svelte 5.59** (custom renderer API): 33 kB with 5.58, 44 kB with 5.59 for
  the same component. There is no opt-out flag. Pin `svelte@~5.58` if size matters more than fixes.
- **Terser beats Vite's default minifier here.** Oxc leaves whitespace in the ES library output:
  60.9 kB vs 43.7 kB with Terser. UMD is identical either way.
- **TypeScript 7 (native) is not adopted yet.** `svelte-check` supports it only through the
  `--tsgo` flag plus an extra `@typescript/native` package and still needs TypeScript 6 installed.
  Not worth it for a project this small.
- **Per-file custom elements** use the function form of `compilerOptions.customElement`
  (Svelte 5.54+) instead of two plugin instances with include/exclude.

## File Structure

```
├── src/
│   ├── wc/                   # Web components
│   │   ├── MyComponent.wc.svelte
│   │   └── web-components.ts # Component registry
│   ├── lib/                  # Svelte components
│   ├── App.svelte            # Demo application
│   └── main.ts               # Entry point
├── preview-index.html        # Production preview template
├── vite.config.ts            # Build configuration
├── svelte.config.js          # Svelte compiler settings
└── CHANGELOG.md              # Version history
```

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and release notes.

## License

MIT © [Dariusz Sikorski](https://dariuszsikorski.pl)

---

Made with ♥ by [Dariusz Sikorski](https://dariuszsikorski.pl)  
[![Website](https://img.shields.io/badge/Visit-My%20Website-green?style=flat-square)](https://dariuszsikorski.pl)
