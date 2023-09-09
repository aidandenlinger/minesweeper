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
				console.debug(buttons);
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
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="1em"
				viewBox="0 0 640 512"
			>
				<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
				<path
					d="M192 64C86 64 0 150 0 256S86 448 192 448H448c106 0 192-86 192-192s-86-192-192-192H192zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V200z"
				/>
			</svg>
		</li>
	</ul>

	<ul>
		<li class="title">Minesweeper</li>
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
	}

	ul.theme-list > li {
		cursor: pointer;
	}
</style>
