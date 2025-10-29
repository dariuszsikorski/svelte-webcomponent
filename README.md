# Svelte Web Components Starter

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A lightweight starter template for building optimized web components with Svelte 5 and TypeScript. Produces production-ready components with:
- **30KB** minified (ES format)
- **12KB** gzipped
- Custom Elements v1 compliant

## Features

⚡️ Ultra-lightweight output  
🛠 TypeScript-first development  
🌐 Universal component format (ES + UMD)  
🔧 Built-in Vite optimizations  
🎯 CSS isolation per component  
📦 Zero-dependency components

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
<svelte:options customElement="my-element" />

<script lang="ts">
  export let value: string;
</script>

<div>Hello {value}</div>
```

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
- Svelte 5.43.0 (custom elements)
- TypeScript 5.9.3
- Vite 6.4.1

**Optimization Features**  
- Double minification (Terser + esbuild)  
- Tree-shaking enabled  
- CSS auto-scoping  
- Dead code elimination  
- Gzip-ready outputs

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
