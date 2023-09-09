<script lang="ts">
  import type { Cell } from "../logic/minesweeper";

  export let cell: Cell;
  export let x: number;
  export let y: number;
</script>

<div class="cell {cell.status}">{x},{y}</div>

<style>
  .cell {
    width: 3rem;
    height: 3rem;
    border: solid 0.3rem darkgray;
  }

  .hidden {
    background-color: gray;
  }
</style>