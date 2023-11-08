import { writable, type Writable } from 'svelte/store';
import { isFirstClickBehavior, type FirstClickBehavior } from '../../logic/minesweeper';

const localFirstClickKey = "firstClickBehavior"
const localFirstClick = localStorage.getItem(localFirstClickKey)
export const firstClickBehavior: Writable<FirstClickBehavior> = writable(isFirstClickBehavior(localFirstClick) ? localFirstClick : "open cell")

firstClickBehavior.subscribe((val) => { localStorage.setItem(localFirstClickKey, val); })

const themes = ["light", "dark"] as const
export type Theme = typeof themes[number]

function isTheme(maybeTheme: unknown): maybeTheme is Theme {
  return typeof maybeTheme === 'string' && themes.find((valid) => valid === maybeTheme) !== undefined
}

const localThemeKey = "currentTheme"
const localTheme = localStorage.getItem(localThemeKey)
export const currentTheme: Writable<Theme> = writable(isTheme(localTheme) ? localTheme : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"))

currentTheme.subscribe((theme) => { localStorage.setItem(localThemeKey, theme); })
