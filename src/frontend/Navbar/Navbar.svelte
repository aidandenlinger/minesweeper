<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte";

	let dispatch = createEventDispatcher();

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

<nav>
	<ul>
		<li>
			<!-- videogame-asset Material Icons by Google, licensed under Apache 2.0 -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				role="img"
			>
				<title>Controller</title>
				<path
					fill="currentColor"
					d="M4 18q-.825 0-1.413-.588T2 16V8q0-.825.588-1.413T4 6h16q.825 0 1.413.588T22 8v8q0 .825-.588 1.413T20 18H4Zm3-3h2v-2h2v-2H9V9H7v2H5v2h2v2Zm7.5 0q.625 0 1.063-.438T16 13.5q0-.625-.438-1.063T14.5 12q-.625 0-1.063.438T13 13.5q0 .625.438 1.063T14.5 15Zm3-3q.625 0 1.063-.438T19 10.5q0-.625-.438-1.063T17.5 9q-.625 0-1.063.438T16 10.5q0 .625.438 1.063T17.5 12Z"
				/>
			</svg>
		</li>
	</ul>

	<ul>
		<li>
			<button on:click={() => dispatch("reset")} class="title">
				Minesweeper
			</button>
		</li>
	</ul>

	<ul>
		<li>
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
		</li>
	</ul>
</nav>

<style>
	.title {
		font-weight: bold;
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

	ul.theme-list > li {
		cursor: pointer;
	}
</style>
