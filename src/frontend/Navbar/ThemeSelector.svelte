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
  {$currentTheme}
</button>
