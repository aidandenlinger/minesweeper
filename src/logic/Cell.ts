export type Cell = { "status": "hidden", flagged: boolean } | { "status": "open", adjMines: number } | { "status": "mine" }
export type Coord = { row: number, column: number }

export function* neighbor(width: number, height: number, { row, column }: Coord): Generator<Coord> {
  for (let neighRow = row - 1; neighRow <= row + 1; ++neighRow) {
    if (neighRow < 0 || neighRow >= height) continue;

    for (let neighCol = column - 1; neighCol <= column + 1; ++neighCol) {
      if (neighCol < 0 || neighCol >= width) continue;
      if (neighRow === row && neighCol === column) continue;

      yield { row: neighRow, column: neighCol };
    }
  }
}