<script lang="ts">
  import { fade } from "svelte/transition";
  import type { FirstClickBehavior } from "../../logic/minesweeper";
  import { firstClickBehavior } from "./stores";

  let firstClickValue: FirstClickBehavior;

  firstClickBehavior.subscribe((v) => (firstClickValue = v));
</script>

<details in:fade>
  <summary>Options</summary>

  <form>
    <fieldset>
      <legend>A first click...</legend>
      <label>
        <input
          type="radio"
          name="firstClick"
          on:click={() => firstClickBehavior.set("open cell")}
          checked={firstClickValue === "open cell"}
        />will be an open cell (if possible)
      </label>
      <label>
        <input
          type="radio"
          name="firstClick"
          on:click={() => firstClickBehavior.set("not mine")}
          checked={firstClickValue === "not mine"}
        />will not be a mine
      </label>
      <label>
        <input
          type="radio"
          name="firstClick"
          on:click={() => firstClickBehavior.set("can be mine")}
          checked={firstClickValue === "can be mine"}
        />can be a mine
      </label>
    </fieldset>
  </form>
</details>
