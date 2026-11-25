import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  compilerOptions: {
    // Runes mode for every component (no legacy `export let` / `$:` syntax)
    runes: true,
    // Only *.wc.svelte files become custom elements, everything else stays a
    // normal Svelte component (function form needs svelte >= 5.54)
    customElement: ({ filename }) => filename.endsWith('.wc.svelte'),
  }
}
