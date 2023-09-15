<script lang="ts">
  import Navbar from "../Navbar/Navbar.svelte";
  import type { Coord } from "../logic/Cell";
  import { create, click } from "../logic/minesweeper";
  import Cell from "./Cell.svelte";

  let gameState = create(5, 7, 1);

  function clickCell(e: CustomEvent<Coord>) {
    gameState = click(gameState, e.detail);
  }
</script>

<Navbar />

<main class="game">
  {#each gameState.game as rowArr, row}
    <div class="row">
      {#each rowArr as cell, column}
        <Cell {cell} coord={{ row, column }} on:clicked={clickCell} />
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
