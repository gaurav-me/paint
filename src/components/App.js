const input = require('./Input');
const Canvas = require('./Canvas');

const start = async () => {
  // const text = await input("enter hi here:\n")
  // console.log(text)

  const canvas = new Canvas();
  canvas.initialise();

  canvas.line(1, 2, 6, 2);
  canvas.line(6, 3, 6, 4);
  canvas.rectangle(14, 1, 18, 3);
  canvas.fill(10, 3, 'o');
  canvas.draw();

  canvas.clear();
};

module.exports = start;
