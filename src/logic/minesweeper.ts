export type GameState = {
  game: Cell[][],
}

export type Cell = { "status": "hidden" } | { "status": "open" } | { "status": "mine" }

export function create(width: number, height: number, _mineCount: number): GameState {
  return {
    game: Array(height).fill(Array(width).fill({ "status": "hidden" }))
  }
}

export function click(state: GameState, x: number, y: number) { }

export function flag(state: GameState, x: number, y: number) { }

export function reveal(state: GameState, x: number, y: number) { }