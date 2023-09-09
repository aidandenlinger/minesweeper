<script lang="ts">
  import Navbar from "../Navbar/Navbar.svelte";
  import { create } from "../logic/minesweeper";
  import Cell from "./Cell.svelte"

  const gameState = create(9, 9, 30);
</script>

<Navbar />

<main class="game">
  <div class="aaa">
    {#each gameState.game as row, x}
      <div class="row">
        {#each row as cell, y}
          <Cell {cell} {x} {y}/>
        {/each}
      </div>
    {/each}
  </div>
</main>

<style>
  .game {
    display: flex;
    justify-content: center;
  }
  
  .row {
    display: flex
  }
</style>