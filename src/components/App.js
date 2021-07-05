const input = require('./Input');
const Canvas = require('./Canvas');

const start = async () => {
  // const text = await input("enter hi here:\n")
  // console.log(text)

  const canvas = new Canvas();
  canvas.initialise();
};

module.exports = start;
