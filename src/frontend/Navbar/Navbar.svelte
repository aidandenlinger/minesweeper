<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import ThemeSelector from "./ThemeSelector.svelte";

	let dispatch = createEventDispatcher<{ reset: null }>();
</script>

<nav>
	<ul>
		<li>
			<!-- videogame-asset Material Symbols by Google, licensed under Apache 2.0 -->
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
			<button on:click={() => dispatch("reset")} id="title">
				Minesweeper
			</button>
		</li>
	</ul>

	<ul>
		<li>
			<ThemeSelector />
		</li>
	</ul>
</nav>

<style>
	#title {
		font-weight: bold;
		/* Remove button CSS */
		background: none;
		color: inherit;
		border: none;
		margin: 0;
		padding: 0;
	}

	/**
   * Remove focus styles for non-keyboard focus.
   * https://stackoverflow.com/a/60219624
   */
	:focus:not(:focus-visible) {
		outline: 0;
		box-shadow: none;
	}

	nav {
		margin: var(--pico-spacing) 0;
	}
</style>
