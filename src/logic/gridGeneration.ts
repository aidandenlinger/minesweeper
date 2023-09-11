import type { Cell } from './minesweeper'

/**
 * Generates a grid of all hidden Cells. Used as the start state for the
 * frontend.
 */
export function createHiddenGrid(width: number, height: number): Cell[][] {
  const hiddenGrid: Cell[][] = new Array(width)

  for (let i = 0; i < width; ++i) {
    hiddenGrid[i] = new Array(height)
    for (let j = 0; j < height; ++j) {
      hiddenGrid[i][j] = { "status": "hidden" }
    }
  }

  return hiddenGrid
}