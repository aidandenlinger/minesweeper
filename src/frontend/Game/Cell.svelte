<script lang="ts">
  import type { Coord, Cell } from "../../logic/Cell";
  import { createEventDispatcher } from "svelte";

  export let cell: Cell;
  export let coord: Coord;

  const dispatch = createEventDispatcher<{
    select: Coord;
    flag: Coord;
  }>();
</script>

<button
  class="cell {cell.status}"
  on:click={() => dispatch("select", coord)}
  on:contextmenu|preventDefault={() => dispatch("flag", coord)}
>
  {#if cell.status === "open" && cell.adjMines !== 0}
    {cell.adjMines}
  {:else if cell.status === "hidden" && cell.flagged}
    <!-- flag, Material Symbols by Google, licensed under Apache 2.0 -->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img">
      <title>Flag</title>
      <path
        fill="#000"
        d="M5 21V4h9l.4 2H20v10h-7l-.4-2H7v7H5Zm7.5-11Zm2.15 4H18V8h-5.25l-.4-2H7v6h7.25l.4 2Z"
      />
    </svg>
  {:else if cell.status === "mine"}
    <!-- bomb, Material Symbols by Google, licensed under Apache 2.0  -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      role="img"
      class="mine-svg"
    >
      <title>Mine!</title>
      <path
        fill="#000"
        d="M8.65 22.8q-3.125 0-5.313-2.212T1.15 15.25q0-3.125 2.163-5.288T8.6 7.8h.325L9.6 6.625q.3-.55.9-.712t1.15.162l.75.425l.125-.2q.575-1.075 1.8-1.4t2.3.3l.875.5l-1 1.725l-.875-.5q-.35-.2-.763-.088t-.612.463l-.125.2l1 .575q.525.3.688.9t-.138 1.125L15 11.3q.575.9.863 1.913t.287 2.087q0 3.125-2.187 5.313T8.65 22.8ZM20 8.8v-2h3v2h-3Zm-5.5-5.5v-3h2v3h-2Zm4.875 2.025l-1.4-1.4L20.1 1.8l1.4 1.4l-2.125 2.125Z"
      />
    </svg>
  {/if}
</button>

<style>
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .mine-svg {
    padding: 0.2rem;
  }

  .cell {
    aspect-ratio: 1;
    max-width: 2.5rem;
    border: solid 0.15rem darkgray;
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
    background-color: red;
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
