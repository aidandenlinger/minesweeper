<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  const dispatch = createEventDispatcher();
</script>

<button
  on:click={() => dispatch("setup", { width: 9, height: 9, mineCount: 10 })}
  in:fade>Beginner</button
>
<button
  on:click={() => dispatch("setup", { width: 16, height: 16, mineCount: 40 })}
  in:fade>Intermediate</button
>
<button
  on:click={() => dispatch("setup", { width: 30, height: 16, mineCount: 99 })}
  in:fade>Advanced</button
>
