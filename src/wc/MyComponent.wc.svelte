<script lang="ts">
  // Define a property (default value: 'World')
  export let name: string = 'World';
</script>

<style>
  p {
    color: blue;
    font-family: sans-serif;
  }
</style>

<p>Hello, {name}!</p>
