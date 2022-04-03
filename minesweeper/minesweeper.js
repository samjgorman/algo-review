// Utility provided for convenience since JS has no seedable random function
function UNSAFE_make_seeded_rng(seed) {
  const get_num = () => {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
  return get_num;
}

// Returns a different "random" number between 0.0 and 1.0 on every call.
const rng = UNSAFE_make_seeded_rng(123);

module.exports = class Minesweeper {
  constructor(width, height, numMines) {
    this.width = width;
    this.height = height;
    this.numMines = numMines;
    this.internalBoard = new Array(width)
      .fill()
      .map(() => Array(height).fill("U"));
    this.fillMines(width, height, numMines);
    this.externalBoard = new Array(width)
      .fill()
      .map(() => Array(height).fill("_"));
    this.gameOver = false;

    console.log(this.internalBoard);
  }

  fillMines(width, height, numMines) {
    for (let i = 0; i < numMines; i++) {
      let randomX = Math.round(rng() * (width - 1));
      let randomY = Math.round(rng() * (height - 1));
      this.internalBoard[randomX][randomY] = "X";
      this.offsets = [
        [0, 1],
        [1, 0],
        [-1, 0],
        [0, -1],
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
      ];
    }
  }

  print() {
    if (this.gameOver) {
      console.log("GAME OVER!");
    }
    let output = "";
    let numUnvisitedSquares = 0;
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.gameOver && this.internalBoard[i][j] === "X")
          this.externalBoard[i][j] = "X";
        //Check if any squares are unvisited. If so, game not won yet.
        if (this.internalBoard[i][j] === "U") numUnvisitedSquares += 1;
        output += this.externalBoard[i][j] + " ";
      }
      console.log(output);
      output = "";
    }

    if (numUnvisitedSquares === 0) {
      console.log("GAME WON!");
    }
  }

  checkForMines(row, col) {
    let numNeighborMines = 0;
    for (let offset of this.offsets) {
      let nextRow = row + offset[0];
      let nextCol = col + offset[1];
      if (
        nextRow >= 0 &&
        nextCol >= 0 &&
        nextRow < this.width &&
        nextCol < this.height
      ) {
        if (this.internalBoard[nextRow][nextCol] === "X") {
          numNeighborMines += 1;
        }
      }
    }
    return numNeighborMines;
  }

  traverse(row, col) {
    //Check if the given X,Y is in bounds
    if (row >= 0 && col >= 0 && row < this.width && col < this.height) {
      if (this.internalBoard[row][col] === "X") {
        this.externalBoard[row][col] = "X";
        this.gameOver = true;
        return;
      }
      //An empty, unrevealed square
      else if (this.internalBoard[row][col] === "U") {
        this.internalBoard[row][col] = "V";
        this.externalBoard[row][col] = "V";

        //Check for adjacent mines and display a number
        let numNeighborMines = this.checkForMines(row, col);
        if (numNeighborMines === 0) {
          //Traverse through neighbors n
          for (let offset of this.offsets) {
            let nextRow = row + offset[0];
            let nextCol = col + offset[1];
            this.traverse(nextRow, nextCol);
          }
        } else {
          //If mines exist, display the num mines
          this.externalBoard[row][col] = numNeighborMines.toString();
        }
      }
    }
  }

  click(x, y) {
    this.traverse(x, y);
  }
};
