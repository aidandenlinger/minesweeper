import { neighbor, type Cell, type Coord } from "./Cell"
import { createGrid, createHiddenGrid } from "./gridGeneration"

export type Status = { state: "playing", minesLeft: number } | { state: "lost" } | { state: "won", time: number }

export interface GameState {
  game: Cell[][],
  status: Status,
}

const firstClickBehaviors = ["open cell", "not mine", "can be mine"] as const
export type FirstClickBehavior = typeof firstClickBehaviors[number]
export function isFirstClickBehavior(maybeBehavior: unknown): maybeBehavior is FirstClickBehavior {
  return typeof maybeBehavior === 'string' && firstClickBehaviors.find((valid) => valid === maybeBehavior) !== undefined
}

let state: GameState
let gameSolution: Cell[][]
let mineCoords: Coord[]
let flagCount: number
let startTime: number
let width: number
let height: number
let mineCount: number
let firstClickBehavior: FirstClickBehavior
let firstClickOccurred: boolean

export function create(widthP: number, heightP: number, mineCountP: number, firstClickP: FirstClickBehavior): GameState {
  if (widthP <= 0 || widthP > 100) {
    throw new Error(`width is not within range: 0 < ${widthP} <= 100 is not true`)
  }
  if (heightP <= 0 || heightP > 100) {
    throw new Error(`height is not within range: 0 < ${heightP} <= 100 is not true`)
  }

  [width, height, mineCount] = [widthP, heightP, mineCountP]
  firstClickBehavior = firstClickP
  flagCount = 0;
  firstClickOccurred = false
  state = { game: createHiddenGrid(width, height), status: { state: "playing", minesLeft: mineCount } }
  startTime = Date.now()

  return structuredClone(state)
}

export function select({ row, column }: Coord): GameState {
  if (row < 0 || row > height) {
    throw new Error("X out of bounds")
  }

  if (column < 0 || column > width) {
    throw new Error("Y out of bounds")
  }

  if (!firstClickOccurred) {
    // This is the first click, now that we know where the first click is generate a board
    [gameSolution, mineCoords] = createGrid(width, height, mineCount, { row, column }, firstClickBehavior)
    firstClickOccurred = true
  }

  const cell = state.game[row][column]

  switch (cell.status) {
    case "hidden":
      if (cell.flagged) break; // Don't allow clicking flagged squares
      if (isEmpty({ row, column })) {
        // this is an empty cell, so it's impossible to lose
        selectEmptyCell({ row, column })
      } else {
        state.game[row][column] = gameSolution[row][column]
        if (gameSolution[row][column].status === "mine") {
          // reveal all mines
          for (const { row, column } of mineCoords) {
            state.game[row][column] = gameSolution[row][column]
          }
          state.status = { state: "lost" }
          // return immediately on loss, don't check win condition
          return structuredClone(state)
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
  const cell = state.game[coord.row][coord.column]
  if (cell.status !== "open") {
    throw new Error("Called chord on a non-open cell!")
  }

  let adjFlags = 0
  for (const n of neighbor(width, height, coord)) {
    const neighborCell = state.game[n.row][n.column]
    if (neighborCell.status === "hidden" && neighborCell.flagged) {
      adjFlags += 1
    }
  }

  // Number of adjacent mines must be equal to adjacent flagged cells to chord
  if (cell.adjMines !== adjFlags) return

  // Click on all non-flagged hidden neighbors, while the game is still playing
  for (const n of neighbor(width, height, coord)) {
    const neighborCell = state.game[n.row][n.column]
    if (state.status.state === "playing" && neighborCell.status === "hidden" && !neighborCell.flagged) {
      select(n)
    }
  }
}

function isWin(): boolean {
  // Is every cell open besides the mines?
  return state.game.flat().reduce((totalOpen, c) =>
    c.status === "open" ? totalOpen + 1 : totalOpen, 0)
    === width * height - mineCoords.length
}

/**
 * Used when a blank cell (0 adjacent mines) is clicked, to clear all
 * adjacent cells. Uses BFS to search and auto-click neighbors.
 */
function selectEmptyCell(start: Coord) {
  if (!isEmpty(start)) {
    throw new Error("Calling clickEmpty on a non-empty cell!")
  }

  // Insert at start of array, remove from end of array
  const queue = [start]
  const visited = new Set([start])

  while (queue.length !== 0) {
    // Will not be undefined, as we just checked length
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { row, column } = queue.pop()!
    const cell = state.game[row][column]

    if (cell.status === "hidden") {
      // reveal cell
      state.game[row][column] = gameSolution[row][column]

      if (!isEmpty({ row, column })) continue;

      // Enqueue neighbors if empty
      for (const n of neighbor(width, height, { row, column })) {
        if (!visited.has(n)) {
          queue.unshift(n)
          visited.add(n)
        }
      }
    }
  }
}

function isEmpty(coord: Coord): boolean {
  const cell = gameSolution[coord.row][coord.column]
  return cell.status === "open" && cell.adjMines === 0
}

export function flag({ row, column }: Coord): GameState {
  const cell = state.game[row][column]
  if (cell.status === "hidden") {
    // Flip it, so flags can be removed or added
    cell.flagged = !cell.flagged
    flagCount += cell.flagged ? 1 : -1
  }
  state.status = { state: "playing", minesLeft: mineCoords.length - flagCount }
  return structuredClone(state)
}
