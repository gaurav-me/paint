const Canvas = require('../src/components/Canvas');

describe('Tests whether the Game class correctly identifies different game scenarios', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new Canvas board based on input dimensions', () => {
    const canvas = new Canvas(5, 4);
    expect(canvas).toBeInstanceOf(Canvas);
    expect(canvas.height).toBe(4);
    expect(canvas.width).toBe(5);

    canvas.createBoard();
    expect(canvas.board).toEqual([
      ['-', '-', '-', '-', '-', '-', '-'],
      ['|', ' ', ' ', ' ', ' ', ' ', '|'],
      ['|', ' ', ' ', ' ', ' ', ' ', '|'],
      ['|', ' ', ' ', ' ', ' ', ' ', '|'],
      ['|', ' ', ' ', ' ', ' ', ' ', '|'],
      ['-', '-', '-', '-', '-', '-', '-'],
    ]);
  });
  it('should update the board when a new vertical line is drawn', () => {
    const canvas = new Canvas(5, 4);
    canvas.createBoard();
    canvas.line({ x1: 1, y1: 2, x2: 1, y2: 3 });
    expect(canvas.board).toEqual([
      ['-', '-', '-', '-', '-', '-', '-'],
      ['|', ' ', ' ', ' ', ' ', ' ', '|'],
      ['|', 'x', ' ', ' ', ' ', ' ', '|'],
      ['|', 'x', ' ', ' ', ' ', ' ', '|'],
      ['|', ' ', ' ', ' ', ' ', ' ', '|'],
      ['-', '-', '-', '-', '-', '-', '-'],
    ]);
  });
  it('should update the board when a new horizontal line is drawn', () => {
    const canvas = new Canvas(5, 4);
    canvas.createBoard();
    canvas.line({ x1: 1, y1: 1, x2: 4, y2: 1 });
    expect(canvas.board).toEqual([
      ['-', '-', '-', '-', '-', '-', '-'],
      ['|', 'x', 'x', 'x', 'x', ' ', '|'],
      ['|', ' ', ' ', ' ', ' ', ' ', '|'],
      ['|', ' ', ' ', ' ', ' ', ' ', '|'],
      ['|', ' ', ' ', ' ', ' ', ' ', '|'],
      ['-', '-', '-', '-', '-', '-', '-'],
    ]);
  });
  it('should draw line when when x1 and y1 are greater than x2 and y2', () => {
    const canvas = new Canvas(5, 4);
    canvas.createBoard();
    canvas.line({ x1: 4, y1: 1, x2: 1, y2: 1 });
    expect(canvas.board).toEqual([
      ['-', '-', '-', '-', '-', '-', '-'],
      ['|', 'x', 'x', 'x', 'x', ' ', '|'],
      ['|', ' ', ' ', ' ', ' ', ' ', '|'],
      ['|', ' ', ' ', ' ', ' ', ' ', '|'],
      ['|', ' ', ' ', ' ', ' ', ' ', '|'],
      ['-', '-', '-', '-', '-', '-', '-'],
    ]);
  });
  it('should update the board when a new rectangle is drawn', () => {
    const canvas = new Canvas(5, 4);
    canvas.createBoard();
    canvas.rectangle({ x1: 1, y1: 2, x2: 3, y2: 4 });
    expect(canvas.board).toEqual([
      ['-', '-', '-', '-', '-', '-', '-'],
      ['|', ' ', ' ', ' ', ' ', ' ', '|'],
      ['|', 'x', 'x', 'x', ' ', ' ', '|'],
      ['|', 'x', ' ', 'x', ' ', ' ', '|'],
      ['|', 'x', 'x', 'x', ' ', ' ', '|'],
      ['-', '-', '-', '-', '-', '-', '-'],
    ]);
  });
  it('should adjust rectangle when x1 and y1 are greater than x2 and y2', () => {
    const canvas = new Canvas(5, 4);
    canvas.createBoard();
    canvas.rectangle({ x1: 3, y1: 4, x2: 1, y2: 2 });
    expect(canvas.board).toEqual([
      ['-', '-', '-', '-', '-', '-', '-'],
      ['|', ' ', ' ', ' ', ' ', ' ', '|'],
      ['|', 'x', 'x', 'x', ' ', ' ', '|'],
      ['|', 'x', ' ', 'x', ' ', ' ', '|'],
      ['|', 'x', 'x', 'x', ' ', ' ', '|'],
      ['-', '-', '-', '-', '-', '-', '-'],
    ]);
  });
  it('should fill area between shapes using given colour', () => {
    const canvas = new Canvas(5, 4);
    canvas.createBoard();
    canvas.rectangle({ x1: 3, y1: 4, x2: 1, y2: 2 });

    const fill = {
      figure: { x: 4, y: 1, c: 'o' },
      meta: { quit: false, commandType: 'B' },
    };
    canvas.fill(fill.figure);
    expect(canvas.board).toEqual([
      ['-', '-', '-', '-', '-', '-', '-'],
      ['|', 'o', 'o', 'o', 'o', 'o', '|'],
      ['|', 'x', 'x', 'x', 'o', 'o', '|'],
      ['|', 'x', ' ', 'x', 'o', 'o', '|'],
      ['|', 'x', 'x', 'x', 'o', 'o', '|'],
      ['-', '-', '-', '-', '-', '-', '-'],
    ]);
  });
  it('should fill area outside overlapping shapes using given colour', () => {
    const canvas = new Canvas(5, 4);
    canvas.createBoard();
    canvas.rectangle({ x1: 3, y1: 4, x2: 1, y2: 1 });
    canvas.rectangle({ x1: 1, y1: 1, x2: 5, y2: 3 });

    const fill = {
      figure: { x: 5, y: 4, c: 'a' },
      meta: { quit: false, commandType: 'B' },
    };
    canvas.fill(fill.figure);
    expect(canvas.board).toEqual([
      ['-', '-', '-', '-', '-', '-', '-'],
      ['|', 'x', 'x', 'x', 'x', 'x', '|'],
      ['|', 'x', ' ', 'x', ' ', 'x', '|'],
      ['|', 'x', 'x', 'x', 'x', 'x', '|'],
      ['|', 'x', 'x', 'x', 'a', 'a', '|'],
      ['-', '-', '-', '-', '-', '-', '-'],
    ]);
  });
  it('should fill area inside overlapping shapes using given colour', () => {
    const canvas = new Canvas(5, 4);
    canvas.createBoard();
    canvas.rectangle({ x1: 3, y1: 4, x2: 1, y2: 1 });
    canvas.rectangle({ x1: 1, y1: 1, x2: 5, y2: 3 });

    const fill = {
      figure: { x: 2, y: 2, c: 'o' },
      meta: { quit: false, commandType: 'B' },
    };
    canvas.fill(fill.figure);
    expect(canvas.board).toEqual([
      ['-', '-', '-', '-', '-', '-', '-'],
      ['|', 'x', 'x', 'x', 'x', 'x', '|'],
      ['|', 'x', 'o', 'x', ' ', 'x', '|'],
      ['|', 'x', 'x', 'x', 'x', 'x', '|'],
      ['|', 'x', 'x', 'x', ' ', ' ', '|'],
      ['-', '-', '-', '-', '-', '-', '-'],
    ]);
  });
  it('should fill the border of shapes using given colour', () => {
    const canvas = new Canvas(5, 4);
    canvas.createBoard();
    canvas.rectangle({ x1: 3, y1: 4, x2: 1, y2: 1 });
    canvas.rectangle({ x1: 1, y1: 1, x2: 5, y2: 3 });

    const fill = {
      figure: { x: 1, y: 1, c: 'o' },
      meta: { quit: false, commandType: 'B' },
    };
    canvas.fill(fill.figure);
    expect(canvas.board).toEqual([
      ['-', '-', '-', '-', '-', '-', '-'],
      ['|', 'o', 'o', 'o', 'o', 'o', '|'],
      ['|', 'o', ' ', 'o', ' ', 'o', '|'],
      ['|', 'o', 'o', 'o', 'o', 'o', '|'],
      ['|', 'o', 'o', 'o', ' ', ' ', '|'],
      ['-', '-', '-', '-', '-', '-', '-'],
    ]);
  });
  it('should clear the canvas once program is over', () => {
    const canvas = new Canvas(5, 4);
    canvas.createBoard();
    canvas.rectangle({ x1: 3, y1: 4, x2: 1, y2: 1 });
    canvas.rectangle({ x1: 1, y1: 1, x2: 5, y2: 3 });

    const fill = {
      figure: { x: 1, y: 1, c: 'o' },
      meta: { quit: false, commandType: 'B' },
    };
    canvas.fill(fill.figure);
    canvas.clear();
    expect(canvas.board).toEqual([]);
  });
  it('should render the canvas board with drawn shapes and fills ', () => {
    jest.spyOn(console, 'log');
    const canvas = new Canvas(5, 4);
    canvas.createBoard();
    canvas.rectangle({ x1: 3, y1: 4, x2: 1, y2: 1 });
    canvas.rectangle({ x1: 1, y1: 1, x2: 5, y2: 3 });

    const fill = {
      figure: { x: 1, y: 1, c: 'o' },
      meta: { quit: false, commandType: 'B' },
    };
    canvas.fill(fill.figure);
    expect(console.log).toHaveBeenCalledTimes(0);
    canvas.render();
    expect(console.log).toHaveBeenCalledTimes(6);
    expect(console.log.mock.calls[0][0]).toBe('-------');
    expect(console.log.mock.calls[1][0]).toBe('|ooooo|');
    expect(console.log.mock.calls[2][0]).toBe('|o o o|');
    expect(console.log.mock.calls[3][0]).toBe('|ooooo|');
    expect(console.log.mock.calls[4][0]).toBe('|ooo  |');
    expect(console.log.mock.calls[5][0]).toBe('-------');
  });
});
