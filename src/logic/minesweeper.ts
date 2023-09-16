import { neighbor, type Cell, type Coord } from "./Cell"
import { createGrid, createHiddenGrid } from "./gridGeneration"

export type Status = "playing" | "lost" | "won"

export type GameState = {
  game: Cell[][],
  status: Status,
  width: number,
  height: number
}

let gameSolution: Cell[][]

export function create(width: number, height: number, mineCount: number): GameState {
  gameSolution = createGrid(width, height, mineCount)

  return { game: createHiddenGrid(width, height), status: "playing", width, height }
}

export function click(state: GameState, { row, column }: Coord): GameState {
  if (row < 0 || row > state.height) {
    throw new Error("X out of bounds")
  }

  if (column < 0 || column > state.width) {
    throw new Error("Y out of bounds")
  }

  switch (state.game[row][column].status) {
    case "hidden":
      if (isEmpty({ row, column })) {
        // this is an empty cell, so it's impossible to lose
        clickEmptyCell(state, { row, column })
      } else {
        state.game[row][column] = gameSolution[row][column]
        if (gameSolution[row][column].status === "mine") {
          state.status = "lost"
        }
      }
      break
    case "open":
      break
    case "mine":
      throw new Error(("Clicked on mine? Game should already be over"))
  }

  return state
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

  while (queue.length !== 0) {
    // Will not be undefined, as we just checked length
    let { row, column } = queue.pop()!
    let cell = state.game[row][column]

    if (cell.status === "hidden") {
      // reveal cell
      state.game[row][column] = gameSolution[row][column]

      // Enqueue neighbors if empty
      if (isEmpty({ row, column })) {
        queue.unshift(...neighbor(state.width, state.height, { row, column }))
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