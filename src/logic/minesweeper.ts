import type { Cell, Coord } from "./Cell"
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

export function click(state: GameState, { row, column }: Coord): GameState {
  if (row < 0 || row > state.height) {
    throw new Error("X out of bounds")
  }

  if (column < 0 || column > state.width) {
    throw new Error("Y out of bounds")
  }

  switch (state.game[row][column].status) {
    case "hidden":
      // TODO: check if mine and end game accordingly
      state.game[row][column] = gameSolution[row][column]
      break
    case "open":
      break
    case "mine":
      throw new Error(("Clicked on mine? Game should already be over"))
  }

  return state
}

export function flag(state: GameState, { row, column }: Coord) { }

export function reveal(state: GameState, { row, column }: Coord) { }