<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  const dispatch = createEventDispatcher();
</script>

<button
  on:click={() => dispatch("setup", { width: 9, height: 9, mineCount: 10 })}
  in:fade
>
  <hgroup>
    <h3>Beginner</h3>
    <p>(9x9, 10 mines)</p>
  </hgroup>
</button>

<button
  on:click={() => dispatch("setup", { width: 16, height: 16, mineCount: 40 })}
  in:fade
>
  <hgroup>
    <h3>Intermediate</h3>
    <p>(16x16, 40 mines)</p>
  </hgroup>
</button>

<button
  on:click={() => dispatch("setup", { width: 30, height: 16, mineCount: 99 })}
  in:fade
>
  <hgroup>
    <h3>Advanced</h3>
    <p>(30x16, 99 mines)</p>
  </hgroup>
</button>

<style>
  hgroup {
    margin: 0;
  }
  h3 {
    color: white;
  }
  p {
    margin: 0;
    color: white;
  }
</style>
