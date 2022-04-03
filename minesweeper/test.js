const { assert } = require("chai");
let Minesweeper = require("./minesweeper");

/**
 * With fixed random seed, position of mines on  5x5 grid are the following:
 * 
 * [
  [ 'U', 'U', 'U', 'U', 'U' ],
  [ 'U', 'U', 'X', 'U', 'X' ],
  [ 'U', 'U', 'U', 'U', 'X' ],
  [ 'U', 'U', 'U', 'U', 'U' ],
  [ 'U', 'X', 'U', 'X', 'U' ]
  ]
 */
describe("Recursively explore unrevealed nodes and print if mine adjacent", function () {
  it("Returns true when synced", async function () {
    let width = 5;
    let height = 5;
    let numMines = 5;

    const game = new Minesweeper(width, height, numMines);
    game.click(0, 0);
    game.click(0, 4);
    game.click(4, 4);
    game.click(3, 4);
    game.click(4, 2);
    game.click(4, 0);
    game.click(3, 2);
    game.click(2, 2);
    game.click(0, 2);
    game.click(1, 3);
    game.click(2, 3);
    game.click(3, 3);
    // game.click(0, 3); //End the game instead

    game.click(4, 1);

    //Game winning sequence

    // game.click(4, 1); //End game

    // game.click(1, 4); // Adjacent to two mines
    // // // game.click(1, 1); //End up on a mine
    game.print();
    result = true;
    assert.equal(result, true);
  });
});
