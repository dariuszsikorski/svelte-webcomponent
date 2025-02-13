import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// Compute __dirname for ES Modules:
const __dirname = dirname(fileURLToPath(import.meta.url))

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
        })
      ],
      build: {
        lib: {
          // Use the web component registration file as the library entry point
          entry: resolve(__dirname, 'src/wc/web-components.ts'),
          name: 'MyWebComponents',
          fileName: (format) => `my-web-components.${format}.js`,
          formats: ['es', 'umd']
        },
        rollupOptions: {
          // Exclude the Svelte runtime from your bundle
          external: ['svelte'],
          output: {
            globals: {
              svelte: 'Svelte'
            }
          }
        },
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
    ]
  }
})
