import { writable, type Writable } from 'svelte/store';
import type { FirstClickBehavior } from '../../logic/minesweeper';

export const firstClickBehavior: Writable<FirstClickBehavior> = writable("open cell")

export type Theme = "light" | "dark"

export const currentTheme: Writable<Theme> = writable(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
