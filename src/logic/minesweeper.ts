export type GameState = {
  game: Cell[][],
}

export type Cell = { "status": "hidden" } | { "status": "open" } | { "status": "mine" }

export function create(width: number, height: number, _mineCount: number): GameState {
  return {
    game: Array(height)
      .fill(undefined)
      .map(() =>
        Array(width)
          .fill(undefined)
          .map(() => { return { "status": "hidden" } }))
  }
}

export function click(state: GameState, x: number, y: number) {
  if (x < 0 || x > state.game.length) {
    throw new Error("X out of bounds")
  }

  if (y < 0 || y > state.game[0].length) {
    throw new Error("Y out of bounds")
  }

  switch (state.game[x][y].status) {
    case "hidden":
      // TODO: check if mine and end game accordingly
      console.debug(`Clicked on hidden ${x} ${y}, setting to open`)
      state.game[x][y] = { status: "open" }
      break
    case "open":
      console.debug(`Clicked on revealed square ${x} ${y}, doing nothing`)
      break
    case "mine":
      throw new Error(("Clicked on mine? Game should already be over"))
  }

  return state
}

export function flag(state: GameState, x: number, y: number) { }

export function reveal(state: GameState, x: number, y: number) { }