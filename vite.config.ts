import { defineConfig, type Plugin } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { copyFileSync, existsSync } from 'fs'

// Compute __dirname for ES Modules:
const __dirname = dirname(fileURLToPath(import.meta.url))

// Plugin to copy preview template to dist after build
function copyPreviewTemplate(): Plugin {
  return {
    name: 'copy-preview-template',
    apply: 'build',
    writeBundle() {
      const previewTemplate = resolve(__dirname, 'preview-index.html');
      const distIndex = resolve(__dirname, 'dist/index.html');

      if (existsSync(previewTemplate)) {
        copyFileSync(previewTemplate, distIndex);
        console.log('✓ Copied preview-index.html to dist/index.html');
      }
    }
  };
}

export default defineConfig(({ command }) => ({
  plugins: [
    // One plugin instance for everything - svelte.config.js decides per file
    // which components are compiled as custom elements (*.wc.svelte)
    svelte(),
    copyPreviewTemplate() // copy preview template to dist after build
  ],
  build: command === 'build' ? {
    // Terser on purpose: Vite's default (Oxc) keeps whitespace in the ES lib output,
    // measured 60.9 kB vs 43.7 kB with Terser (UMD is the same either way)
    minify: 'terser',
    terserOptions: {
      compress: {
        pure_getters: true,
        unsafe: true,
        passes: 10,
      },
      mangle: true,
    },
    lib: {
      // Use the web component registration file as the library entry point
      entry: resolve(__dirname, 'src/wc/web-components.ts'),
      name: 'MyWebComponents',
      fileName: (format) => `my-web-components.${format}.js`,
      // Build both ES and UMD formats
      formats: ['es', 'umd']
    },
    // Disable sourcemaps for production
    sourcemap: false,
    outDir: 'dist'
  } : undefined,
  preview: {
    port: 4173,
    strictPort: false,
    host: true,
    open: true,
  }
}))
