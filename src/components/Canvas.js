const input = require("./Input");

class Canvas {
  constructor() {
    this.isActive = false;
    this.board = [];
  }

  getCellValue(rowIndex, colIndex, w, h) {
    const result =
      rowIndex === 0 || rowIndex === h - 1
        ? "-"
        : colIndex === 0 || colIndex === w - 1
        ? "|"
        : " ";
    console.log(
      "rowIndex, colIndex, w, h, result",
      rowIndex,
      colIndex,
      w,
      h,
      result
    );
    return result;
  }

  createBoard = (w, h) => {
    if (!w || !h) return;
    if (typeof w !== "number" || typeof h !== "number") return;

    const borderedWidth = w + 2;
    const borderedHeight = h + 2;

    this.board = new Array(borderedHeight).fill(null).map((row, rowIndex) =>
      new Array(borderedWidth).fill(null).map((col, colIndex) => ({
        value: this.getCellValue(
          rowIndex,
          colIndex,
          borderedWidth,
          borderedHeight
        ),
        figureIds: [],
      }))
    );
  };

  draw() {
    this.board.map((row) => {
      let renderCells = "";
      row.map((cell) => {
        renderCells += cell.value;
      });
      console.log(renderCells);
      //   console.log('\n');
    });
  }

  async initialise() {
    // const size = await input(
    //   'Welcome, please enter size to create your canvas: '
    // );
    const size = "C 5 2";
    console.log("\n");

    const [commandType, width, height] = (size && size.split(" ")) || [];

    if (commandType !== "C" || !width || !height) {
      // TODO: validate number
      console.log("Please enter size of canvas in format 'C width height'\n");
      this.initialise();
    }

    this.createBoard(Number(width), Number(height));
    console.log(this.board);
    console.log(this.draw());
  }

  // Make old canvas data eligible for garbage collection
  clear() {
    this.board = [];
  }
}

module.exports = Canvas;
