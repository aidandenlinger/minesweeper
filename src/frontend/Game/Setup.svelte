<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import type { GameConditions } from "../App.svelte";

  const dispatch = createEventDispatcher();

  type Difficulty = {
    name: string;
    conds: GameConditions;
  };

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
    on:click={() => sendDifficulty(conds)}
    in:fade
  >
    <hgroup>
      <h3>{name}</h3>
      <p>({conds.width}x{conds.height}, {conds.mineCount} mines)</p>
    </hgroup>
  </button>
{/each}

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
