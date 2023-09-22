import { neighbor, type Cell, type Coord } from "./Cell"
import { createGrid, createHiddenGrid } from "./gridGeneration"

export type Status = { state: "playing" } | { state: "lost" } | { state: "won", time: number }

export type GameState = {
  game: Cell[][],
  status: Status,
  width: number,
  height: number,
  mineCount: number
}

let gameSolution: Cell[][]
let mineCoords: Coord[]
let startTime: number

export function create(width: number, height: number, mineCount: number): GameState {
  [gameSolution, mineCoords] = createGrid(width, height, mineCount)
  let game: GameState = { game: createHiddenGrid(width, height), status: { state: "playing" }, width, height, mineCount }
  startTime = Date.now()

  return game
}

export function click(state: GameState, { row, column }: Coord): GameState {
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
        clickEmptyCell(state, { row, column })
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
      break
    case "mine":
      throw new Error(("Clicked on mine? Game should already be over"))
  }

  if (isWin(state)) {
    // Convert ms to seconds, round up
    state.status = { state: "won", time: Math.ceil((Date.now() - startTime) / 1000) }
  }

  return state
}

function isWin(state: GameState): boolean {
  // Is every cell open besides the mines?
  return state.game.flat().reduce((totalOpen, c) =>
    c.status === "open" ? totalOpen + 1 : totalOpen, 0)
    === state.width * state.height - state.mineCount
}

/**
 * Used when a blank cell (0 adjacent mines) is clicked, to clear all
 * adjacent cells. Uses BFS to search and auto-click neighbors.
 */
function clickEmptyCell(state: GameState, start: Coord): GameState {
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

  return state
}

function isEmpty(coord: Coord): boolean {
  let cell = gameSolution[coord.row][coord.column]
  return cell.status === "open" && cell.adjMines === 0
}

export function flag(state: GameState, { row, column }: Coord): GameState {
  let cell = state.game[row][column]
  if (cell.status == "hidden") {
    // Flip it, so flags can be removed or added
    cell.flagged = !cell.flagged
  }
  return state
}

export function reveal(state: GameState, { row, column }: Coord) { }