<script lang="ts">
  import { currentTheme, type Theme } from "../Game/stores";

  let themes: Theme[] = ["auto", "light", "dark"];

  // currentTheme is now tied to the "data-theme" attribute on the html tag
  currentTheme.subscribe((theme) => {
    switch (theme) {
      case "auto":
        const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        document
          .querySelector("html")!
          .setAttribute("data-theme", preferredTheme);
        break;

      default:
        document.querySelector("html")!.setAttribute("data-theme", theme);
        break;
    }
  });

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
    {#if $currentTheme === "auto"}
      <!-- baseline-auto-mode, Material Icons by Google, Apache 2.0 -->
      <title>Auto Theme</title>
      <path
        fill="currentColor"
        d="M19.03 3.56c-1.67-1.39-3.74-2.3-6.03-2.51v2.01c1.73.19 3.31.88 4.61 1.92l1.42-1.42zM11 3.06V1.05c-2.29.2-4.36 1.12-6.03 2.51l1.42 1.42A8.928 8.928 0 0 1 11 3.06zM4.98 6.39L3.56 4.97C2.17 6.64 1.26 8.71 1.05 11h2.01c.19-1.73.88-3.31 1.92-4.61zM20.94 11h2.01c-.21-2.29-1.12-4.36-2.51-6.03l-1.42 1.42A8.928 8.928 0 0 1 20.94 11zM7 12l3.44 1.56L12 17l1.56-3.44L17 12l-3.44-1.56L12 7l-1.56 3.44z"
      />
      <path
        fill="currentColor"
        d="M12 21a8.96 8.96 0 0 1-7.46-4H7v-2H1v6h2v-2.7c1.99 2.84 5.27 4.7 9 4.7c4.87 0 9-3.17 10.44-7.56l-1.96-.45C19.25 18.48 15.92 21 12 21z"
      />
    {:else if $currentTheme === "light"}
      <!-- baseline-light-mode, Material Icons by Google, Apache 2.0 -->
      <title>Light Theme</title>
      <path
        fill="currentColor"
        d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0a.996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0a.996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41a.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41a.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"
      />
    {:else}
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
