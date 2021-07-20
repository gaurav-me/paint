const { DEFAULT_FILL } = require('../common/constants');

class Canvas {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = [];
  }

  getCellValue(rowIndex, colIndex, w, h) {
    return rowIndex === 0 || rowIndex === h - 1
      ? '-'
      : colIndex === 0 || colIndex === w - 1
      ? '|'
      : ' ';
  }

  createBoard() {
    const borderedWidth = this.width + 2;
    const borderedHeight = this.height + 2;

    this.board = new Array(borderedHeight)
      .fill(null)
      .map((row, rowIndex) =>
        new Array(borderedWidth)
          .fill(null)
          .map((col, colIndex) =>
            this.getCellValue(rowIndex, colIndex, borderedWidth, borderedHeight)
          )
      );
  }

  render() {
    this.board.forEach((row) => {
      let renderRow = '';
      row.forEach((cell) => {
        renderRow += cell;
      });
      console.log(renderRow);
    });
  }

  line(line) {
    const { x1, y1, x2, y2 } = line || {};

    if (y1 === y2) {
      const smallerX = x1 > x2 ? x2 : x1;
      const largerX = x1 > x2 ? x1 : x2;

      for (let i = smallerX; i <= largerX; i++) {
        this.board[y1][i] = DEFAULT_FILL;
      }
    } else {
      const smallerY = y1 > y2 ? y2 : y1;
      const largerY = y1 > y2 ? y1 : y2;

      for (let i = smallerY; i <= largerY; i++) {
        this.board[i][x1] = DEFAULT_FILL;
      }
    }
  }

  rectangle(rectangle) {
    const { x1, y1, x2, y2 } = rectangle || {};
    const smallerX = x1 > x2 ? x2 : x1;
    const largerX = x1 > x2 ? x1 : x2;
    const smallerY = y1 > y2 ? y2 : y1;
    const largerY = y1 > y2 ? y1 : y2;

    for (let i = smallerX; i <= largerX; i++) {
      this.board[y1][i] = DEFAULT_FILL;
      this.board[y2][i] = DEFAULT_FILL;
    }
    for (let i = smallerY; i <= largerY; i++) {
      this.board[i][x1] = DEFAULT_FILL;
      this.board[i][x2] = DEFAULT_FILL;
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

  fill({ x, y, c: newColour }) {
    const oldColour = this.board[y][x];
    this.floodFill(x, y, newColour, oldColour);
  }

  // Make old canvas data eligible for garbage collection
  clear() {
    this.board = [];
  }
}

module.exports = Canvas;
