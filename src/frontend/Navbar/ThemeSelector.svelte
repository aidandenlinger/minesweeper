<script lang="ts">
  import { onMount } from "svelte";

  onMount(() => {
    /*!
     * Minimal theme switcher
     *
     * Pico.css - https://picocss.com
     * Copyright 2019-2023 - Licensed under MIT
     */

    const themeSwitcher = {
      // Config
      _scheme: "auto",
      menuTarget: "details[role='list']",
      buttonsTarget: "li[data-theme-switcher]",
      buttonAttribute: "data-theme-switcher",
      rootAttribute: "data-theme",
      localStorageKey: "picoPreferredColorScheme",

      // Init
      init() {
        this.scheme = this.schemeFromLocalStorage;
        this.initSwitchers();
      },

      // Get color scheme from local storage
      get schemeFromLocalStorage(): string {
        if (typeof window.localStorage !== "undefined") {
          if (window.localStorage.getItem(this.localStorageKey) !== null) {
            return (
              window.localStorage.getItem(this.localStorageKey) ?? this._scheme
            );
          }
        }
        return this._scheme;
      },

      // Preferred color scheme
      get preferredColorScheme(): "dark" | "light" {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      },

      // Init switchers
      initSwitchers() {
        const buttons = document.querySelectorAll(this.buttonsTarget);
        buttons.forEach((button) => {
          button.addEventListener(
            "click",
            (event) => {
              event.preventDefault();
              // Set scheme
              this.scheme =
                button.getAttribute(this.buttonAttribute) ?? this._scheme;
              // Close dropdown
              document.querySelector(this.menuTarget)?.removeAttribute("open");
            },
            false
          );
        });
      },

      // Set scheme
      set scheme(scheme) {
        if (scheme == "auto") {
          this.preferredColorScheme == "dark"
            ? (this._scheme = "dark")
            : (this._scheme = "light");
        } else if (scheme == "dark" || scheme == "light") {
          this._scheme = scheme;
        }
        this.applyScheme();
        this.schemeToLocalStorage();
      },

      // Get scheme
      get scheme() {
        return this._scheme;
      },

      // Apply scheme
      applyScheme() {
        document
          .querySelector("html")
          ?.setAttribute(this.rootAttribute, this.scheme);
      },

      // Store scheme to local storage
      schemeToLocalStorage() {
        if (typeof window.localStorage !== "undefined") {
          window.localStorage.setItem(this.localStorageKey, this.scheme);
        }
      },
    };

    // Init
    themeSwitcher.init();
  });
</script>

<details role="list" dir="rtl">
  <summary aria-haspopup="listbox" role="link" class="secondary">
    Theme
  </summary>

  <ul class="theme-list" role="listbox">
    <li data-theme-switcher="auto">Auto</li>
    <li data-theme-switcher="light">Light</li>
    <li data-theme-switcher="dark">Dark</li>
  </ul>
</details>

<style>
  ul.theme-list > li {
    cursor: pointer;
  }
</style>
