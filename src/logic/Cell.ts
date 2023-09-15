import type { GameState } from "./minesweeper"
export type Cell = { "status": "hidden" } | { "status": "open" } | { "status": "mine" }

export function* neighbor(gameState: GameState, x: number, y: number): Generator<number[]> {
  for (let neighX = x - 1; neighX <= x + 1; ++neighX) {
    if (neighX < 0 || neighX >= gameState.width) continue;
    for (let neighY = y - 1; neighY <= y + 1; ++neighY) {
      if (neighY < 0 || neighY >= gameState.height) continue;
      if (neighX == x && neighY == y) continue;
      yield [neighX, neighY];
    }
  }
}