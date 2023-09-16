<script lang="ts">
  import Setup from "./Setup.svelte"
  import Navbar from "../Navbar/Navbar.svelte";
  import type { Coord } from "../logic/Cell";
  import { create, click, flag, type GameState } from "../logic/minesweeper";
  import Cell from "./Cell.svelte";
  import { fade } from "svelte/transition";

  type GameConditions = {
    width: number,
    height: number,
    mineCount: number
  }

  let gameState : GameState | null;

  function createGame(e: CustomEvent<GameConditions>) {
    gameState = create(e.detail.width, e.detail.height, e.detail.mineCount)  
  }

  function clickCell(e: CustomEvent<Coord>) {
    if (gameState && gameState.status === "playing") {
      gameState = click(gameState, e.detail);
    }
  }

  function rightClickCell(e: CustomEvent<Coord>) {
    if (gameState && gameState.status === "playing") {
      gameState = flag(gameState, e.detail);
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
  {/if}

  {#if gameState && gameState.status === "won"}
    <p class="winText" in:fade out:fade>Nice Minesweepin', kid.</p>
  {/if}

  {#if gameState && (gameState.status === "lost" || gameState.status === "won")}
    <button
      class="restartBtn"
      on:click={() => (gameState = null)}
      in:fade={{ delay: 400, duration: 1000 }}
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
