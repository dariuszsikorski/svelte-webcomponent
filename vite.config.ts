import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { transform } from 'esbuild'
import terser from '@rollup/plugin-terser'
import { copyFileSync, existsSync } from 'fs'

// Compute __dirname for ES Modules:
const __dirname = dirname(fileURLToPath(import.meta.url))

// Optional custom minification plugin using esbuild
function minifyEs() {
  return {
    name: 'minifyEs',
    renderChunk: {
      order: 'post' as const,
      async handler(code: string, _chunk: any, outputOptions: { format: string }) {
        if (outputOptions.format === 'es') {
          const result = await transform(code, { minify: true });
          return result.code;
        }
        return code;
      }
    }
  };
}

// Plugin to copy preview template to dist after build
function copyPreviewTemplate() {
  return {
    name: 'copy-preview-template',
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

export default defineConfig(({ command }) => {
  if (command === 'build') {
    return {
      plugins: [
        // Process normal Svelte files (exclude .wc.svelte files)
        svelte({
          exclude: '**/*.wc.svelte'
        }),
        // Process web component files (only include .wc.svelte files) and compile them as custom elements
        svelte({
          include: '**/*.wc.svelte',
          compilerOptions: {
            customElement: true
          }
        }),
        minifyEs(), // extra minification plugin using esbuild
        terser({
          compress: {
            pure_getters: true,
            unsafe: true,
            passes: 10,
          },
          mangle: true,
        }),
        copyPreviewTemplate() // copy preview template to dist after build
      ],
      build: {
        lib: {
          // Use the web component registration file as the library entry point
          entry: resolve(__dirname, 'src/wc/web-components.ts'),
          name: 'MyWebComponents',
          fileName: (format) => `my-web-components.${format}.js`,
          // Build both ES and UMD formats
          formats: ['es', 'umd']
        },
        rollupOptions: {
          // Externalize Svelte runtime to remove it from the bundle
          external: ['svelte', 'svelte/internal'],
          output: {
            globals: {
              svelte: 'Svelte',
              'svelte/internal': 'SvelteInternal'
            }
          }
        },
        // Disable sourcemaps for production
        sourcemap: false,
        outDir: 'dist'
      }
    }
  }

  // Development (dev server) configuration:
  return {
    plugins: [
      svelte({
        exclude: '**/*.wc.svelte'
      }),
      svelte({
        include: '**/*.wc.svelte',
        compilerOptions: {
          customElement: true
        }
      })
    ],
    preview: {
      port: 4173,
      strictPort: false,
      host: true,
      open: true,
    }
  }
})
