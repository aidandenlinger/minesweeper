import { neighbor, type Cell, type Coord } from "./Cell"
import { createGrid, createHiddenGrid } from "./gridGeneration"

export type Status = { state: "playing", minesLeft: number } | { state: "lost" } | { state: "won", time: number }

export type GameState = {
  game: Cell[][],
  status: Status,
  width: number,
  height: number,
  mineCount: number
}

let state: GameState
let gameSolution: Cell[][]
let mineCoords: Coord[]
let flagCount: number
let startTime: number

export function create(width: number, height: number, mineCount: number): GameState {
  flagCount = 0;
  [gameSolution, mineCoords] = createGrid(width, height, mineCount)
  state = { game: createHiddenGrid(width, height), status: { state: "playing", minesLeft: mineCount }, width, height, mineCount }
  startTime = Date.now()

  return structuredClone(state)
}

export function click({ row, column }: Coord): GameState {
  if (row < 0 || row > state.height) {
    throw new Error("X out of bounds")
  }

  if (column < 0 || column > state.width) {
    throw new Error("Y out of bounds")
  }

  let cell = state.game[row][column]

  switch (cell.status) {
    case "hidden":
      if (cell.flagged) break; // Don't allow clicking flagged squares
      if (isEmpty({ row, column })) {
        // this is an empty cell, so it's impossible to lose
        clickEmptyCell({ row, column })
      } else {
        state.game[row][column] = gameSolution[row][column]
        if (gameSolution[row][column].status === "mine") {
          // reveal all mines
          for (let { row, column } of mineCoords) {
            state.game[row][column] = gameSolution[row][column]
          }
          state.status = { state: "lost" }
        }
      }
      break
    case "open":
      // Chording is only applicable on cells with adjacent flags.
      // We should never calculate it on an empty cell
      if (cell.adjMines !== 0) chord({ row, column })
      break
    case "mine":
      throw new Error(("Clicked on mine? Game should already be over"))
  }

  if (isWin()) {
    // Convert ms to seconds, round up
    state.status = { state: "won", time: Math.ceil((Date.now() - startTime) / 1000) }
  }

  return structuredClone(state)
}

function chord(coord: Coord) {
  let cell = state.game[coord.row][coord.column]
  if (cell.status !== "open") {
    throw new Error("Called chord on a non-open cell!")
  }

  let adjFlags = 0
  for (let n of neighbor(state.width, state.height, coord)) {
    let neighborCell = state.game[n.row][n.column]
    if (neighborCell.status === "hidden" && neighborCell.flagged) {
      adjFlags += 1
    }
  }

  // Number of adjacent mines must be equal to adjacent flagged cells to chord
  if (cell.adjMines !== adjFlags) return

  // Click on all non-flagged hidden neighbors, while the game is still playing
  for (let n of neighbor(state.width, state.height, coord)) {
    let neighborCell = state.game[n.row][n.column]
    if (state.status.state === "playing" && neighborCell.status === "hidden" && !neighborCell.flagged) {
      click(n)
    }
  }
}

function isWin(): boolean {
  // Is every cell open besides the mines?
  return state.game.flat().reduce((totalOpen, c) =>
    c.status === "open" ? totalOpen + 1 : totalOpen, 0)
    === state.width * state.height - state.mineCount
}

/**
 * Used when a blank cell (0 adjacent mines) is clicked, to clear all
 * adjacent cells. Uses BFS to search and auto-click neighbors.
 */
function clickEmptyCell(start: Coord) {
  if (!isEmpty(start)) {
    throw new Error("Calling clickEmpty on a non-empty cell!")
  }

  // Insert at start of array, remove from end of array
  let queue = [start]
  let visited = new Set([start])

  while (queue.length !== 0) {
    // Will not be undefined, as we just checked length
    let { row, column } = queue.pop()!
    let cell = state.game[row][column]

    if (cell.status === "hidden") {
      // reveal cell
      state.game[row][column] = gameSolution[row][column]

      if (!isEmpty({ row, column })) continue;

      // Enqueue neighbors if empty
      for (let n of neighbor(state.width, state.height, { row, column })) {
        if (!visited.has(n)) {
          queue.unshift(n)
          visited.add(n)
        }
      }
    }
  }
}

function isEmpty(coord: Coord): boolean {
  let cell = gameSolution[coord.row][coord.column]
  return cell.status === "open" && cell.adjMines === 0
}

export function flag({ row, column }: Coord): GameState {
  let cell = state.game[row][column]
  if (cell.status === "hidden") {
    // Flip it, so flags can be removed or added
    cell.flagged = !cell.flagged
    flagCount += cell.flagged ? 1 : -1
  }
  state.status =  { state: "playing", minesLeft: state.mineCount - flagCount }
  return structuredClone(state)
}
