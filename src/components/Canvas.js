const input = require('./Input');

class Canvas {
  constructor() {
    this.width = 0;
    this.height = 0;
    this.board = [];
  }

  getCellValue(rowIndex, colIndex, w, h) {
    return rowIndex === 0 || rowIndex === h - 1
      ? '-'
      : colIndex === 0 || colIndex === w - 1
      ? '|'
      : ' ';
  }

  createBoard = (w, h) => {
    if (!w || !h) return;
    if (typeof w !== 'number' || typeof h !== 'number') return;

    const borderedWidth = w + 2;
    const borderedHeight = h + 2;

    this.board = new Array(borderedHeight)
      .fill(null)
      .map((row, rowIndex) =>
        new Array(borderedWidth)
          .fill(null)
          .map((col, colIndex) =>
            this.getCellValue(rowIndex, colIndex, borderedWidth, borderedHeight)
          )
      );
  };

  draw() {
    this.board.forEach((row) => {
      let renderRow = '';
      row.forEach((cell) => {
        renderRow += cell;
      });
      console.log(renderRow);
    });
  }

  async initialise() {
    // const size = await input(
    //   'Welcome, please enter size to create your canvas: '
    // );
    const size = 'C 20 4';
    console.log('\n');

    const [commandType, width, height] = (size && size.split(' ')) || [];

    if (commandType !== 'C' || !width || !height) {
      // TODO: validate number
      console.log("Please enter size of canvas in format 'C width height'\n");
      this.initialise();
    }

    this.width = width;
    this.height = height;

    this.createBoard(Number(width), Number(height));
  }

  // Leave old canvas data eligible for garbage collection
  clear() {
    this.board = [];
  }

  line(x1, y1, x2, y2) {
    // const size = 'L 1 2 6 2';
    // let [commandType, x1, y1, x2, y2] = (size && size.split(' ')) || [];

    // if (commandType !== 'L' || !x1 || !y1 || !x2 || !y2) {
    //   // TODO: validate number
    //   console.log(
    //     "Please enter dimensions of line in format 'C width height'\n"
    //   );
    //   return;
    // }

    // TODO: sort to find min number, instantiate a validation class here
    // x1 = parseInt(x1);
    // x2 = parseInt(x2);
    // y1 = parseInt(y1);
    // y2 = parseInt(y2);
    if (y1 === y2) {
      for (let i = x1; i <= x2; i++) {
        this.board[y1][i] = 'x';
      }
    } else {
      for (let i = y1; i <= y2; i++) {
        this.board[i][x1] = 'x';
      }
    }
  }

  rectangle(x1, y1, x2, y2) {
    for (let i = x1; i <= x2; i++) {
      this.board[y1][i] = 'x';
      this.board[y2][i] = 'x';
    }
    for (let i = y1; i <= y2; i++) {
      this.board[i][x1] = 'x';
      this.board[i][x2] = 'x';
    }
  }

  floodFill(x, y, newColour, oldColour) {
    if (
      x <= 0 ||
      x > this.width ||
      y <= 0 ||
      y > this.height ||
      this.board[y][x] !== oldColour ||
      this.board[y][x] === newColour
    )
      return;

    this.board[y][x] = newColour;

    this.floodFill(x + 1, y, newColour, oldColour);
    this.floodFill(x - 1, y, newColour, oldColour);
    this.floodFill(x, y + 1, newColour, oldColour);
    this.floodFill(x, y - 1, newColour, oldColour);
  }

  fill(x, y, newColour) {
    const oldColour = this.board[y][x];
    this.floodFill(x, y, newColour, oldColour);
  }
}

module.exports = Canvas;
