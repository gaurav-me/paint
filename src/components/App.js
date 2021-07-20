const { printMessage, printNewLine } = require('../common/utils');
const { LINE, RECTANGLE, FILL } = require('../common/constants');
const Canvas = require('./Canvas');

const start = async () => {
  printMessage('Program started.');

  const { meta, width, height } = await getValidatedCanvasSize(
    "Please enter dimensions of the canvas in the format 'C width height': "
  );
  if (meta.quit) {
    printMessage('Program ended');
    return;
  }

  printNewLine();

  const canvas = new Canvas(width, height);
  canvas.createBoard();
  printMessage('Board created');

  canvas.render();
  printNewLine();

  while (true) {
    const {
      meta: { quit, commandType },
      figure,
    } = await getValidatedCommand('Ready for next command: ', canvas);

    if (quit) break;

    switch (commandType) {
      case LINE:
        canvas.line(figure);
        break;
      case RECTANGLE:
        canvas.rectangle(figure);
        break;
      case FILL:
        canvas.fill(figure);
        break;
    }
    canvas.render();
  }

  canvas.clear();

  printMessage('Program ended');
  return;
};

module.exports = start;
