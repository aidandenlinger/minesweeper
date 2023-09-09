<script lang="ts">
  import type { Cell } from "../logic/minesweeper";
  import { createEventDispatcher } from "svelte";

  export let cell: Cell;
  export let x: number;
  export let y: number;

  const dispatch = createEventDispatcher();
</script>

<div class="cell {cell.status}" on:click={dispatch("clicked", { x: x, y: y })}>
  {x},{y}
</div>

<style>
  .cell {
    width: 3rem;
    height: 3rem;
    border: solid 0.3rem darkgray;
  }

  .hidden {
    background-color: gray;
  }

  .open {
    background-color: white;
  }
</style>
