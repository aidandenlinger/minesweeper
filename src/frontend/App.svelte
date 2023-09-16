<script lang="ts">
  import Navbar from "../Navbar/Navbar.svelte";
  import type { Coord } from "../logic/Cell";
  import { create, click, flag } from "../logic/minesweeper";
  import Cell from "./Cell.svelte";
  import { fade } from "svelte/transition";

  let gameState = create(9, 9, 10);

  function clickCell(e: CustomEvent<Coord>) {
    if (gameState.status === "playing") {
      gameState = click(gameState, e.detail);
    }
  }

  function rightClickCell(e: CustomEvent<Coord>) {
    if (gameState.status === "playing") {
      gameState = flag(gameState, e.detail);
    }
  }
</script>

<Navbar />

<main>
  <div class="game">
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

  {#if gameState.status === "won"}
    <p class="winText" in:fade out:fade>Nice Minesweepin', kid.</p>
  {/if}

  {#if gameState.status === "lost" || gameState.status === "won"}
    <button
      class="restartBtn"
      on:click={() => (gameState = create(9, 9, 10))}
      in:fade={{ delay: 400, duration: 1000 }}
      out:fade
    >
      Restart?
    </button>
  {/if}
</main>

<style>
  .row {
    display: flex;
    justify-content: center;
  }

  .restartBtn {
    margin-bottom: 0;
    margin-top: 1rem;
  }

  .winText {
    font-size: 4rem;
    text-align: center;
  }
</style>
