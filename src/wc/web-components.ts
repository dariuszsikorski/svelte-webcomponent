// Import your web component Svelte files
import MyComponent from './MyComponent.wc.svelte'

// (Optional) If your .wc.svelte files use <svelte:options tag="...">,
// they register themselves on import. Otherwise, you can register manually:
// customElements.define('my-component', MyComponent);

// Export them so they can be imported elsewhere if desired
export { MyComponent }
