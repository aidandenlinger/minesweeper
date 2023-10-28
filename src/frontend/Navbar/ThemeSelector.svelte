<script lang="ts">
  import { currentTheme, type Theme } from "../Game/stores";

  let themes: Theme[] = ["light", "dark"];

  // currentTheme is now tied to the "data-theme" attribute on the html tag
  currentTheme.subscribe((theme) =>
    document.querySelector("html")!.setAttribute("data-theme", theme)
  );

  function cycle() {
    let index = themes.findIndex((val) => val === $currentTheme)!;
    $currentTheme = themes[(index + 1) % themes.length];
  }
</script>

<button on:click={cycle}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    {#if $currentTheme === "light"}
      <!-- baseline-light-mode, Material Icons by Google, Apache 2.0 -->
      <title>Light Theme</title>
      <path
        fill="currentColor"
        d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0a.996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0a.996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41a.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41a.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"
      />
    {:else if $currentTheme === "dark"}
      <title>Dark Theme</title>
      <path
        fill="currentColor"
        d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26a5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"
      />
    {/if}
  </svg>
</button>

<style>
  button {
    /* Remove button CSS */
    background: none;
    color: inherit;
    border: none;
    margin: 0;
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
