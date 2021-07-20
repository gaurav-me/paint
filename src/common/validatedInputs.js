const { parseInts, isValidNumber } = require('./utils');
const { CREATE, LINE, RECTANGLE, FILL, QUIT } = require('./constants');
const Input = require('../components/Input');
const Line = require('../components/Line');
const Rectangle = require('../components/Rectangle');

const input = new Input();

const getValidatedCanvasSize = async (msg) => {
  const command = await input.ask(msg);
  let [commandType, width, height] = (command && command.split(' ')) || [];

  if (commandType === QUIT) return { meta: { commandType, quit: true } };

  [width, height] = parseInts(width, height);
  if (commandType === CREATE && isValidNumber(width) && isValidNumber(height)) {
    return { meta: { commandType, quit: false }, width, height };
  }

  return await getValidatedCanvasSize(
    'Invalid command, please enter command in format C width height: '
  );
};

const getValidatedCommand = async (msg, canvas) => {
  const command = await input.ask(msg);
  const [commandType, arg1, arg2, arg3, arg4] =
    (command && command.split(' ')) || [];

  if (commandType === QUIT) return { meta: { quit: true, commandType } };

  const [x1, y1, x2, y2] = parseInts(arg1, arg2, arg3, arg4);
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
    if (
      isValidNumber(x1) &&
      isValidNumber(y1) &&
      arg3 &&
      arg3.length === 1 &&
      x1 <= canvas.width &&
      y1 <= canvas.height
    )
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

module.exports = { getValidatedCommand, getValidatedCanvasSize };
