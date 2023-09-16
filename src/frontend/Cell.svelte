<script lang="ts">
  import type { Coord, Cell } from "../logic/Cell";
  import { createEventDispatcher } from "svelte";

  export let cell: Cell;
  export let coord: Coord;

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch("clicked", coord);
  }

  function handleRightClick() {
    dispatch("rightclicked", coord);
  }
</script>

<button
  class="cell {cell.status}"
  class:flag={cell.status === "hidden" && cell.flagged}
  on:click={handleClick}
  on:contextmenu|preventDefault={handleRightClick}
>
  {#if cell.status === "open" && cell.adjMines !== 0}
    {cell.adjMines}
  {/if}
</button>

<style>
  .cell {
    aspect-ratio: 1;
    max-width: 2.5rem;
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
    /*
      Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. 
    */
    background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M459.1 52.4L442.6 6.5C440.7 2.6 436.5 0 432.1 0s-8.5 2.6-10.4 6.5L405.2 52.4l-46 16.8c-4.3 1.6-7.3 5.9-7.2 10.4c0 4.5 3 8.7 7.2 10.2l45.7 16.8 16.8 45.8c1.5 4.4 5.8 7.5 10.4 7.5s8.9-3.1 10.4-7.5l16.5-45.8 45.7-16.8c4.2-1.5 7.2-5.7 7.2-10.2c0-4.6-3-8.9-7.2-10.4L459.1 52.4zm-132.4 53c-12.5-12.5-32.8-12.5-45.3 0l-2.9 2.9C256.5 100.3 232.7 96 208 96C93.1 96 0 189.1 0 304S93.1 512 208 512s208-93.1 208-208c0-24.7-4.3-48.5-12.2-70.5l2.9-2.9c12.5-12.5 12.5-32.8 0-45.3l-80-80zM200 192c-57.4 0-104 46.6-104 104v8c0 8.8-7.2 16-16 16s-16-7.2-16-16v-8c0-75.1 60.9-136 136-136h8c8.8 0 16 7.2 16 16s-7.2 16-16 16h-8z"/></svg>');
    background-position: center;
    background-size: 1.5em;
    background-color: red;
  }

  .flag {
    /*
      Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. 
    */
    background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M48 24C48 10.7 37.3 0 24 0S0 10.7 0 24V64 350.5 400v88c0 13.3 10.7 24 24 24s24-10.7 24-24V388l80.3-20.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L48 52V24zm0 77.5l96.6-24.2c27-6.7 55.5-3.6 80.4 8.8c54.9 27.4 118.7 29.7 175 6.8V334.7l-24.4 9.1c-33.7 12.6-71.2 10.7-103.4-5.4c-48.2-24.1-103.3-30.1-155.6-17.1L48 338.5v-237z"/></svg>');
    background-position: center;
    background-size: 1.5em;
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
