const input = require("./Input");

class Canvas {
  constructor() {
    this.board = [];
  }

  getCellValue(rowIndex, colIndex, w, h) {
    return rowIndex === 0 || rowIndex === h - 1
      ? "-"
      : colIndex === 0 || colIndex === w - 1
      ? "|"
      : " ";
  }

  createBoard = (w, h) => {
    if (!w || !h) return;
    if (typeof w !== "number" || typeof h !== "number") return;

    const borderedWidth = w + 2;
    const borderedHeight = h + 2;

    this.board = new Array(borderedHeight).fill(null).map((row, rowIndex) =>
      new Array(borderedWidth).fill(null).map((col, colIndex) => {
        const value = this.getCellValue(
          rowIndex,
          colIndex,
          borderedWidth,
          borderedHeight
        );
        return {
          value,
          ...(value === " " && { figureIds: [] }),
        };
      })
    );
  };

  draw() {
    this.board.forEach((row) => {
      let renderRow = "";
      row.forEach((cell) => {
        renderRow += cell.value;
      });
      console.log(renderRow);
    });
  }

  async initialise() {
    // const size = await input(
    //   'Welcome, please enter size to create your canvas: '
    // );
    const size = "C 4 4";
    console.log("\n");

    const [commandType, width, height] = (size && size.split(" ")) || [];

    if (commandType !== "C" || !width || !height) {
      // TODO: validate number
      console.log("Please enter size of canvas in format 'C width height'\n");
      this.initialise();
    }

    this.createBoard(Number(width), Number(height));
    console.log(this.board);
  }

  // Leave old canvas data eligible for garbage collection
  clear() {
    this.board = [];
  }

  line() {
    const size = "L 2 2 2 5";
    const [commandType, x1, y1, x2, y2] = (size && size.split(" ")) || [];

    if (commandType !== "L" || !x1 || !y1 || !x2 || !y2) {
      // TODO: validate number
      console.log(
        "Please enter dimensions of line in format 'C width height'\n"
      );
      return;
    }

    // TODO: sort to find min number

    if (y1 === y2) {
      for (let i = x1; i <= x2; i++) {
        this.board[y1][i].value = "x";
      }
    } else {
      for (let i = y1; i <= y2; i++) {
        this.board[i][x1].value = "x";
      }
    }
  }
}

module.exports = Canvas;
