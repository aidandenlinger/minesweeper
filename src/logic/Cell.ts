import type { GameState } from "./minesweeper"
export type Cell = { "status": "hidden" } | { "status": "open" } | { "status": "mine" }
export type Coord = { row: number, column: number }

export function* neighbor(gameState: GameState, { row, column }: Coord): Generator<Coord> {
  for (let neighRow = row - 1; neighRow <= row + 1; ++neighRow) {
    if (neighRow < 0 || neighRow >= gameState.width) continue;

    for (let neighCol = column - 1; neighCol <= column + 1; ++neighCol) {
      if (neighCol < 0 || neighCol >= gameState.height) continue;
      if (neighRow == row && neighCol == column) continue;

      yield { row: neighRow, column: neighCol };
    }
  }
}