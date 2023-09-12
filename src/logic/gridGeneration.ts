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

export function createGrid(width: number, height: number, mineCount: number): Cell[][] {
  if (mineCount > width * height) {
    throw new Error("More mines than grid size!")
  }

  // Fill grid with all open cells
  const grid = new Array(width)

  for (let i = 0; i < width; ++i) {
    grid[i] = new Array(height)
    for (let j = 0; j < height; ++j) {
      grid[i][j] = { "status": "open" }
    }
  }

  // get and set mine coordinates
  const mineCoords = getMineCoordinates(width, height, mineCount)

  mineCoords.forEach(([x, y]) => {
    grid[x][y] = { "status": "mine" }
  })

  return grid;
}

function getMineCoordinates(width: number, height: number, mineCount: number): number[][] {
  // First, we need all grid coordinates
  const coordinates: number[][] = new Array()

  for (let x = 0; x < width; ++x) {
    for (let y = 0; y < height; ++y) {
      coordinates.push([x, y])
    }
  }

  // Next, shuffle the array
  // https://stackoverflow.com/a/12646864
  for (let i = coordinates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = coordinates[i];
    coordinates[i] = coordinates[j];
    coordinates[j] = temp;
  }

  // Now, take mineCount number of elements and we have our mine locations!
  return coordinates.slice(0, mineCount)
}