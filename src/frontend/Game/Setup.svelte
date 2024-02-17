<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import type { GameConditions } from "../App.svelte";
  import CustomSize from "./CustomSize.svelte";
  import Options from "./Options.svelte";

  const dispatch = createEventDispatcher<{ setup: GameConditions }>();

  interface Difficulty {
    name: string;
    conds: GameConditions;
  }

  let difficulties: Difficulty[] = [
    { name: "Beginner", conds: { width: 9, height: 9, mineCount: 10 } },
    { name: "Intermediate", conds: { width: 16, height: 16, mineCount: 40 } },
    { name: "Advanced", conds: { width: 30, height: 16, mineCount: 99 } },
  ];

  function sendDifficulty(diff: GameConditions) {
    dispatch("setup", diff);
  }
</script>

{#each difficulties as { name, conds }}
  <button
    on:click={() => {
      sendDifficulty(conds);
    }}
    in:fade|global
  >
    <strong>{name}</strong>
    ({conds.width}x{conds.height}, {conds.mineCount} mines)
  </button>
{/each}

<CustomSize
  on:custom={(e) => {
    sendDifficulty(e.detail);
  }}
/>

<Options />

<style>
  button {
    width: 100%;
    margin-bottom: var(--pico-spacing);
  }
</style>
