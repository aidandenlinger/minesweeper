import type { Cell, Coord } from './Cell'

/**
 * Generates a grid of all hidden Cells. Used as the start state for the
 * frontend.
 */
export function createHiddenGrid(width: number, height: number): Cell[][] {
  const hiddenGrid: Cell[][] = new Array(width)

  for (let row = 0; row < height; ++row) {
    hiddenGrid[row] = new Array(width)
    for (let col = 0; col < width; ++col) {
      hiddenGrid[row][col] = { "status": "hidden" }
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

  for (let row = 0; row < height; ++row) {
    grid[row] = new Array(height)
    for (let col = 0; col < width; ++col) {
      grid[row][col] = { "status": "open" }
    }
  }

  // get and set mine coordinates
  const mineCoords = getMineCoordinates(width, height, mineCount)

  mineCoords.forEach(({row, column}) => {
    grid[row][column] = { "status": "mine" }
  })

  return grid;
}

function getMineCoordinates(width: number, height: number, mineCount: number): Coord[] {
  // First, we need all grid coordinates
  const coordinates: Coord[] = new Array()

  for (let row = 0; row < height; ++row) {
    for (let column = 0; column < width; ++column) {
      coordinates.push({row, column})
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