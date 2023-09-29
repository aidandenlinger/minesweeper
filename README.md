# Minesweeper

![An image of a minesweeper game](docs/minesweeper.png)

A minimal Minesweeper clone written for desktop browsers using Svelte and
picoCSS. [Play here!](https://aidandenlinger.github.io/minesweeper/)

## Install
If you don't want to install anything, you can [play it 
online.](https://aidandenlinger.github.io/minesweeper/)

To install locally, you will need to install [pnpm](https://pnpm.io/), which is
the package  manager for this repo. With `pnpm` installed, run `pnpm install` to
install the project's dependencies.

## Usage
[Visit the website](https://aidandenlinger.github.io/minesweeper/), or if you're
running locally, run `pnpm run dev` to start a local development server. To
get the final files, run `pnpm run build` to build the project, and serve the
resulting `dist` server as a website.

The rules are the same as typical Minesweeper. Left click to unveil squares,
right click to flag uncovered squares, and you can left click on an uncovered
square to chord if you've flagged all the squares you believe to be mines
around it.

## Thanks
- [PicoCSS](https://picocss.com/) for a great and simple CSS framework, as
  well as code for changing the theme.

## Contributing
I'm open to any PRs that add or improve features!

## License
MIT