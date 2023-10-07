<script lang="ts">
  import Setup from "./Setup.svelte";
  import Navbar from "./Navbar/Navbar.svelte";
  import type { Coord } from "../logic/Cell";
  import { create, click, flag, type GameState } from "../logic/minesweeper";
  import Cell from "./Cell.svelte";
  import { fade } from "svelte/transition";

  type GameConditions = {
    width: number;
    height: number;
    mineCount: number;
  };

  let gameState: GameState | null;
  let lastSettings: GameConditions;

  function createGame(e: CustomEvent<GameConditions>) {
    lastSettings = e.detail;
    gameState = create(e.detail.width, e.detail.height, e.detail.mineCount);
  }

  function clickCell(e: CustomEvent<Coord>) {
    if (gameState && gameState.status.state === "playing") {
      gameState = click(e.detail);
    }
  }

  function rightClickCell(e: CustomEvent<Coord>) {
    if (gameState && gameState.status.state === "playing") {
      gameState = flag(e.detail);
    }
  }
</script>

<Navbar />

<main>
  {#if !gameState}
    <Setup on:setup={createGame} />
  {/if}

  {#if gameState}
    <div class="game" in:fade>
      {#each gameState.game as rowArr, row}
        <div class="row">
          {#each rowArr as cell, column}
            <Cell
              {cell}
              coord={{ row, column }}
              on:clicked={clickCell}
              on:rightclicked={rightClickCell}
            />
          {/each}
        </div>
      {/each}
    </div>
    {#if gameState.status.state === "playing"}
      <p class="mineCount">Mines left: {gameState.status.minesLeft}</p>
    {/if}
  {/if}

  {#if gameState && gameState.status.state === "won"}
    <p class="winText" in:fade out:fade>Nice Minesweepin', kid.</p>
    <p class="timeText" in:fade={{ delay: 500 }} out:fade>
      You sweeped those mines in {gameState.status.time} seconds.
    </p>
  {/if}

  {#if gameState && (gameState.status.state === "lost" || gameState.status.state === "won")}
    <div class="restartBtns">
      <button
        on:click={() =>
          (gameState = create(
            lastSettings.width,
            lastSettings.height,
            lastSettings.mineCount
          ))}
        in:fade={{ delay: 500, duration: 1000 }}
      >
        Restart (Same Difficulty)
      </button>
      <button
        on:click={() => (gameState = null)}
        in:fade={{ delay: 500, duration: 1000 }}
      >
        Restart (New Difficulty)
      </button>
    </div>
  {/if}
</main>

<style>
  .row {
    display: flex;
    justify-content: center;
  }

  .mineCount {
    padding-top: var(--spacing);
  }

  p {
    text-align: center;
    margin: 0;
  }

  .timeText {
    font-size: 2rem;
  }

  .winText {
    font-size: 4rem;
  }

  .restartBtns > button {
    margin: 1rem;
  }

  .restartBtns {
    display: flex;
  }
</style>
