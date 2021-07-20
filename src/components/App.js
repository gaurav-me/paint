const input = require('./Input');
const { isValidNumber } = require('../common/utils');
const { CREATE, LINE, RECTANGLE, FILL, QUIT } = require('../common/constants');
const Canvas = require('./Canvas');
const Line = require('./Line');
const Rectangle = require('./Rectangle');

const getValidatedSize = async (msg) => {
  const command = await input(msg);

  let [commandType, width, height] = (command && command.split(' ')) || [];

  if (commandType === QUIT) return { meta: { commandType, quit: true } };

  width = parseInt(width);
  height = parseInt(height);

  if (commandType === CREATE && isValidNumber(width) && isValidNumber(height)) {
    return { meta: { commandType, quit: false }, width, height };
  }

  return await getValidatedSize(
    'Invalid command, please enter command in format C width height: '
  );
};

const getValidatedCommand = async (msg, canvas) => {
  const command = await input(msg);

  const [commandType, arg1, arg2, arg3, arg4] =
    (command && command.split(' ')) || [];

  if (commandType === QUIT) return { meta: { quit: true, commandType } };

  const x1 = parseInt(arg1);
  const y1 = parseInt(arg2);
  const x2 = parseInt(arg3);
  const y2 = parseInt(arg4);

  if (commandType === LINE) {
    const line = new Line(canvas, x1, y1, x2, y2);
    const validation = line.validate();
    if (validation.success)
      return { figure: line, meta: { quit: false, commandType } };
  }
  if (commandType === RECTANGLE) {
    const rectangle = new Rectangle(canvas, x1, y1, x2, y2);
    const validation = rectangle.validate();
    if (validation.success)
      return { figure: rectangle, meta: { quit: false, commandType } };
  }
  if (commandType === FILL) {
    if (isValidNumber(x1) && isValidNumber(y1) && arg3)
      return {
        figure: { x: x1, y: y1, c: arg3 },
        meta: { quit: false, commandType },
      };
  }

  return await getValidatedCommand(
    'Invalid command, please try again: ',
    canvas
  );
};

const start = async () => {
  console.log('Program started.');

  const { meta, width, height } = await getValidatedSize(
    "Please enter dimensions of the canvas in the format 'C width height': "
  );
  if (meta.quit) {
    console.log('Program ended');
    return;
  }

  console.log('\n');

  const canvas = new Canvas(width, height);
  canvas.createBoard();
  console.log('Board created');
  canvas.draw();

  console.log('\n');

  while (true) {
    const {
      meta: { quit, commandType },
      figure,
    } = await getValidatedCommand('Ready for next command: ', canvas);

    if (quit) break;

    switch (commandType) {
      case LINE:
        canvas.line(figure);
        canvas.draw();
        break;
      case RECTANGLE:
        canvas.rectangle(figure);
        canvas.draw();
        break;
      case FILL:
        canvas.fill(figure);
        canvas.draw();
        break;
    }
  }

  canvas.clear();
  console.log('Program ended');

  return;
};

module.exports = start;
