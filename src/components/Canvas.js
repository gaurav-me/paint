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

  draw() {
    console.log('this.board', this.board);
    this.board.forEach((row) => {
      let renderRow = '';
      row.forEach((cell) => {
        renderRow += cell;
      });
      console.log(renderRow);
    });
  }

  // Make old canvas data eligible for garbage collection
  clear() {
    this.board = [];
  }

  line(line) {
    const { x1, y1, x2, y2 } = line || {};
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

  rectangle(rectangle) {
    const { x1, y1, x2, y2 } = rectangle || {};
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

  fill({ x, y, c: newColour }) {
    const oldColour = this.board[y][x];
    this.floodFill(x, y, newColour, oldColour);
  }
}

module.exports = Canvas;
