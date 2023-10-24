<script lang="ts">
  import { fade } from "svelte/transition";
  import { firstClickBehavior } from "./stores";
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
          on:click={() => ($firstClickBehavior = "open cell")}
          checked={$firstClickBehavior === "open cell"}
        />will be an open cell (if possible)
      </label>
      <label>
        <input
          type="radio"
          name="firstClick"
          on:click={() => ($firstClickBehavior = "not mine")}
          checked={$firstClickBehavior === "not mine"}
        />will not be a mine
      </label>
      <label>
        <input
          type="radio"
          name="firstClick"
          on:click={() => ($firstClickBehavior = "can be mine")}
          checked={$firstClickBehavior === "can be mine"}
        />can be a mine
      </label>
    </fieldset>
  </form>
</details>
