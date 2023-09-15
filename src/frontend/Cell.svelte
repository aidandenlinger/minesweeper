<script lang="ts">
  import type { Coord, Cell } from "../logic/Cell";
  import { createEventDispatcher } from "svelte";

  export let cell: Cell;
  export let coord: Coord;
  let {row, column} = coord;

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch("clicked", coord)
  }
</script>

<div class="cell {cell.status}" on:click={handleClick}>
  {row},{column}
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

  .mine {
    background-color: black;
  }
</style>
