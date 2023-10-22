import { neighbor, type Cell, type Coord } from './Cell'
import type { FirstClickBehavior } from './minesweeper'

/**
 * Generates a grid of all hidden Cells. Used as the start state for the
 * frontend.
 */
export function createHiddenGrid(width: number, height: number): Cell[][] {
  const hiddenGrid: Cell[][] = new Array(height)

  for (let row = 0; row < height; ++row) {
    hiddenGrid[row] = new Array(width)
    for (let col = 0; col < width; ++col) {
      hiddenGrid[row][col] = { "status": "hidden", flagged: false }
    }
  }

  return hiddenGrid
}

export function createGrid(width: number, height: number, mineCount: number, firstClick: Coord, firstClickBehavior: FirstClickBehavior): [Cell[][], Coord[]] {
  if (mineCount > width * height) {
    throw new Error("More mines than grid size!")
  }

  // Fill grid with all open cells
  const grid: Cell[][] = new Array(height)

  for (let row = 0; row < height; ++row) {
    grid[row] = new Array(width)
    for (let column = 0; column < width; ++column) {
      // Initial value of open cell with 0 adjacent mines
      grid[row][column] = { "status": "open", adjMines: 0 }
    }
  }

  // get and set mine coordinates
  const mineCoords = getMineCoordinates(width, height, mineCount, firstClick, firstClickBehavior)

  for (let { row, column } of mineCoords) {
    grid[row][column] = { "status": "mine" }
  }

  for (let mine of mineCoords) {
    for (let { row, column } of neighbor(width, height, mine)) {
      let n = grid[row][column];
      if (n.status === "open") {
        n.adjMines += 1;
      }
    }
  }

  return [grid, mineCoords];
}

function getMineCoordinates(width: number, height: number, mineCount: number, firstClick: Coord, firstClickBehavior: FirstClickBehavior): Coord[] {
  // First, we need all grid coordinates
  const coordinates: Coord[] = new Array()

  let bannedCells: Set<Coord> = new Set()

  if (mineCount < width * height) {
    switch (firstClickBehavior) {
      case "open cell":
        bannedCells.add(firstClick)

        // The number of cells left that aren't mines
        // Game field - number of mines we need to place - the first click which we've protected
        let numOfNeighborsToAdd = width * height - mineCount - 1

        for (const n of neighbor(width, height, firstClick)) {
          if (numOfNeighborsToAdd <= 0) break
          bannedCells.add(n)
          --numOfNeighborsToAdd
        }

        break
      case "not mine":
        bannedCells.add(firstClick)
        break
      case "can be mine":
        // no banned cells
        break
    }
  }

  // Make sure we don't ban so many cells that we can't have a game
  for (let i = width * height - bannedCells.size - mineCount; i < 0; ++i) {
    for (const bannedCell of bannedCells) {
      bannedCells.delete(bannedCell)
      break
    }
  }

  for (let row = 0; row < height; ++row) {
    nextNum:
    for (let column = 0; column < width; ++column) {
      // this SUCKS. Coords are objects so we can't just === them
      for (const banned of bannedCells) {
        if (banned.row === row && banned.column === column) continue nextNum
      }
      coordinates.push({ row, column })
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