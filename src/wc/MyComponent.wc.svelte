<svelte:options
  customElement={{
    tag: 'my-component',
    props: {
      name: { type: 'String', reflect: true },
      count: { type: 'Number' }
    }
  }}
/>

<script lang="ts">
  let { name = 'World', count = 0 }: { name?: string; count?: number } = $props();

  const handleIncrementClick = () => {
    count += 1;
    // $host() is the custom element itself - events cross the shadow boundary with composed: true
    $host().dispatchEvent(
      new CustomEvent('count-change', { detail: { count }, bubbles: true, composed: true })
    );
  };
</script>

<style>
  p {
    color: blue;
    font-family: sans-serif;
    outline: solid 1px red;
  }
</style>

<p>Hello, {name}!</p>
<button type="button" onclick={handleIncrementClick}>count is {count}</button>
