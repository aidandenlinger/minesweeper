<script lang="ts">
  import type { GameConditions } from "../App.svelte";
  import type { Coord } from "../../logic/Cell";
  import {
    create,
    select,
    flag,
    type GameState,
  } from "../../logic/minesweeper";
  import Cell from "./Cell.svelte";
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import { firstClickBehavior } from "./stores";

  export let gameSettings: GameConditions;
  let gameState: GameState = create(
    gameSettings.width,
    gameSettings.height,
    gameSettings.mineCount,
    $firstClickBehavior
  );

  let dispatch = createEventDispatcher<{ reset: null }>();

  function selectCell(e: CustomEvent<Coord>) {
    if (gameState.status.state === "playing") {
      gameState = select(e.detail);
    }
  }

  function flagCell(e: CustomEvent<Coord>) {
    if (gameState.status.state === "playing") {
      gameState = flag(e.detail);
    }
  }
</script>

<div class="game" in:fade>
  {#each gameState.game as rowArr, row}
    <div class="row">
      {#each rowArr as cell, column}
        <Cell
          {cell}
          coord={{ row, column }}
          on:select={selectCell}
          on:flag={flagCell}
        />
      {/each}
    </div>
  {/each}
</div>

{#if gameState.status.state === "playing"}
  <p id="mineCount">Mines left: {gameState.status.minesLeft}</p>
{/if}

{#if gameState.status.state === "won"}
  <p id="winText" in:fade out:fade>Nice Minesweepin', kid.</p>
  <p id="timeText" in:fade={{ delay: 500 }} out:fade>
    You sweeped those mines in {gameState.status.time} seconds.
  </p>
{/if}

{#if gameState.status.state === "lost" || gameState.status.state === "won"}
  <div id="restartBtns" in:fade={{ delay: 500, duration: 1000 }}>
    <button
      on:click={() =>
        (gameState = create(
          gameSettings.width,
          gameSettings.height,
          gameSettings.mineCount,
          $firstClickBehavior
        ))}
    >
      Restart (Same Difficulty)
    </button>
    <button on:click={() => dispatch("reset")}>
      Restart (New Difficulty)
    </button>
  </div>
{/if}

<style>
  .row {
    display: flex;
    justify-content: center;
  }

  #mineCount {
    padding-top: var(--pico-spacing);
  }

  p {
    text-align: center;
    margin: 0;
  }

  #timeText {
    font-size: 2rem;
  }

  #winText {
    font-size: 4rem;
  }

  #restartBtns > button {
    margin: 1rem;
  }

  #restartBtns {
    display: flex;
    justify-content: center;
  }
</style>
