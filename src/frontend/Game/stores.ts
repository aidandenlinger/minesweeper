import { writable, type Writable } from 'svelte/store';
import type { FirstClickBehavior } from '../../logic/minesweeper';

export const firstClickBehavior: Writable<FirstClickBehavior> = writable("open cell")