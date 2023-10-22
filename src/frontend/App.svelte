<script lang="ts" context="module">
  export type GameConditions = {
    width: number;
    height: number;
    mineCount: number;
  };
</script>

<script lang="ts">
  import Setup from "./Game/Setup.svelte";
  import Navbar from "./Navbar/Navbar.svelte";
  import Game from "./Game/Game.svelte";
  import type { FirstClickBehavior } from "../logic/minesweeper";
  import { firstClickBehavior } from "./Game/stores";

  let gameSettings: GameConditions | null;
  let firstClickValue: FirstClickBehavior;

  firstClickBehavior.subscribe((v) => (firstClickValue = v));

  function saveSettings(e: CustomEvent<GameConditions>) {
    gameSettings = e.detail;
  }

  function reset() {
    gameSettings = null;
    // TODO: firstClickBehavior should be in a store. should never be reset
  }
</script>

<Navbar on:reset={reset} />

<main>
  {#if !gameSettings}
    <Setup on:setup={saveSettings} />
  {:else}
    <Game
      {gameSettings}
      firstClickBehavior={firstClickValue}
      on:reset={reset}
    />
  {/if}
</main>
