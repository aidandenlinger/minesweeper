import { writable, type Writable } from 'svelte/store';
import type { FirstClickBehavior } from '../../logic/minesweeper';

export const firstClickBehavior: Writable<FirstClickBehavior> = writable(localStorage.getItem("firstClickBehavior") as FirstClickBehavior ?? "open cell")

firstClickBehavior.subscribe((val) => localStorage.setItem("firstClickBehavior", val))

export type Theme = "light" | "dark"

export const currentTheme: Writable<Theme> = writable(localStorage.getItem("currentTheme") as Theme ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"))

currentTheme.subscribe((theme) => localStorage.setItem("currentTheme", theme))
