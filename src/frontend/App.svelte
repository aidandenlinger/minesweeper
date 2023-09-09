<script lang="ts">
  import Navbar from "../Navbar/Navbar.svelte";
  import { create, click } from "../logic/minesweeper";
  import Cell from "./Cell.svelte";

  let gameState = create(9, 9, 30);
</script>

<Navbar />

<main class="game">
  {#each gameState.game as row, x}
    <div class="row">
      {#each row as cell, y}
        <Cell
          {cell}
          {x}
          {y}
          on:clicked={(e) => gameState = click(gameState, e.detail.x, e.detail.y)}
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
