<script lang="ts">
  import Navbar from "../Navbar/Navbar.svelte";
  import { create, click } from "../logic/minesweeper";
  import Cell from "./Cell.svelte";

  let gameState = create(5, 7, 1);
</script>

<Navbar />

<main class="game">
  {#each gameState.game as rowArr, row}
    <div class="row">
      {#each rowArr as cell, column}
        <Cell
          {cell}
          coord={{ row, column }}
          on:clicked={(e) => (gameState = click(gameState, e.detail))}
        />
      {/each}
    </div>
  {/each}
</main>

<style>
  .row {
    display: flex;
    justify-content: center;
  }
</style>
