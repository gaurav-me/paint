const { parseInts, isValidNumber } = require('./utils');
const { CREATE, LINE, RECTANGLE, FILL, QUIT } = require('./constants');
const Input = require('../components/Input');
const Line = require('../components/Line');
const Rectangle = require('../components/Rectangle');
const Fill = require('../components/Fill');

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

  let validation = { success: false, msg: 'Invalid command.' };
  switch (commandType) {
    case LINE:
      const line = new Line(canvas, x1, y1, x2, y2);
      validation = line.validate();
      if (validation.success)
        return { figure: line, meta: { quit: false, commandType } };
      break;
    case RECTANGLE:
      const rectangle = new Rectangle(canvas, x1, y1, x2, y2);
      validation = rectangle.validate();
      if (validation.success)
        return { figure: rectangle, meta: { quit: false, commandType } };
      break;
    case FILL:
      const fill = new Fill(canvas, x1, y1, arg3);
      validation = fill.validate();
      if (validation.success)
        return { figure: fill, meta: { quit: false, commandType } };
      break;
  }

  return await getValidatedCommand(
    `${validation.msg} Please try again: `,
    canvas
  );
};

module.exports = { getValidatedCommand, getValidatedCanvasSize };
