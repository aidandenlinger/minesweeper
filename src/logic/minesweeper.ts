import type { Cell } from "./Cell"
import { createGrid, createHiddenGrid } from "./gridGeneration"

export type GameState = {
  game: Cell[][],
  width: number,
  height: number
}

let gameSolution: Cell[][]

export function create(width: number, height: number, mineCount: number): GameState {
  gameSolution = createGrid(width, height, mineCount)

  return { game: createHiddenGrid(width, height), width, height }
}

export function click(state: GameState, row: number, col: number): GameState {
  if (row < 0 || row > state.height) {
    throw new Error("X out of bounds")
  }

  if (col < 0 || col > state.width) {
    throw new Error("Y out of bounds")
  }

  switch (state.game[row][col].status) {
    case "hidden":
      // TODO: check if mine and end game accordingly
      console.debug(`Clicked on hidden ${row} ${col}`)
      state.game[row][col] = gameSolution[row][col]
      break
    case "open":
      console.debug(`Clicked on revealed square ${row} ${col}, doing nothing`)
      break
    case "mine":
      throw new Error(("Clicked on mine? Game should already be over"))
  }

  return state
}

export function flag(state: GameState, row: number, col: number) { }

export function reveal(state: GameState, row: number, col: number) { }