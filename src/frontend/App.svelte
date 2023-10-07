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

  let gameSettings: GameConditions | null;

  function saveSettings(e: CustomEvent<GameConditions>) {
    gameSettings = e.detail;
  }

  function reset() {
    console.log("resetting")
    gameSettings = null;
  }
</script>

<Navbar on:reset={reset} />

<main>
  {#if !gameSettings}
    <Setup on:setup={saveSettings} />
  {:else}
    <Game {gameSettings} on:reset={reset} />
  {/if}
</main>
