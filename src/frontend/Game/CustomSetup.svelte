<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { GameConditions } from "../App.svelte";
  import type { EventHandler } from "svelte/elements";
  let width: number | undefined;
  let height: number | undefined;
  let mineCount: number | undefined;
  let mineCountInput: HTMLInputElement;

  let dispatch = createEventDispatcher<{ custom: GameConditions }>();

  let customDifficulty: EventHandler<SubmitEvent, HTMLFormElement> = ({
    currentTarget,
  }) => {
    // Check inputs!
    if (!currentTarget.checkValidity()) return;

    // This should be true after checking validity, but Typescript doesn't
    // know that
    if (
      width !== undefined &&
      height !== undefined &&
      mineCount !== undefined
    ) {
      let conds: GameConditions = { width, height, mineCount };

      dispatch("custom", conds);
    }
  };

  /**
   * Invariant that needs to run each time any number changes. Ensure
   * mineCount isn't larger than grids. I don't like running this on
   * any change, but the form won't submit at all if there's a custom
   * validity set.
   */
  function mineCountInRange() {
    if (
      width !== undefined &&
      height !== undefined &&
      mineCount !== undefined &&
      mineCount > width * height
    ) {
      mineCountInput.setCustomValidity(
        "Mine count cannot be larger than the number of cells in the game!"
      );
    } else {
      mineCountInput.setCustomValidity("");
    }
  };
</script>

<details>
  <summary>Custom Setup</summary>
  <form on:submit|preventDefault={customDifficulty}>
    <fieldset>
      <label>
        Width:
        <input
          required
          bind:value={width}
          on:change={() => mineCountInRange()}
          type="number"
          min="1"
        />
      </label>
      <label>
        Height:
        <input
          required
          bind:value={height}
          on:change={() => mineCountInRange()}
          type="number"
          min="1"
        />
      </label>
      <label>
        Number of Mines:
        <input
          required
          bind:value={mineCount}
          on:change={() => mineCountInRange()}
          type="number"
          min="1"
          bind:this={mineCountInput}
        />
      </label>
    </fieldset>

    <button>Submit</button>
  </form>
</details>

<style>
  fieldset {
    display: flex;
  }

  fieldset > label {
    padding: 0 1rem;
  }

  details {
    margin: 2rem 0;
  }
</style>
