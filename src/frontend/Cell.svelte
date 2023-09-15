<script lang="ts">
  import type { Coord, Cell } from "../logic/Cell";
  import { createEventDispatcher } from "svelte";

  export let cell: Cell;
  export let coord: Coord;
  let { row, column } = coord;

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch("clicked", coord);
  }
</script>

<button class="cell {cell.status}" on:click={handleClick}>
  {row},{column}
</button>

<style>
  .cell {
    width: 3rem;
    height: 3rem;
    border: solid 0.3rem darkgray;
    margin: 0;
    padding: 0;
    border-radius: 0;
  }

  .hidden {
    background-color: gray;
  }

  .open {
    background-color: white;
    color: black;
  }

  .mine {
    background-color: black;
  }

  /**
   * Remove focus styles for non-keyboard focus.
   * https://stackoverflow.com/a/60219624
   */
  :focus:not(:focus-visible) {
    outline: 0;
    box-shadow: none;
  }
</style>
