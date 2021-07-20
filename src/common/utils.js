const isValidNumber = (arg) => arg && typeof arg === 'number' && arg > 0;

const printMessage = (msg) => console.log(msg);

const printNewLine = () => console.log('\n');

const parseInts = (...args) => [...args].map((arg) => parseInt(arg));

module.exports = {
  isValidNumber,
  printMessage,
  printNewLine,
  parseInts,
};
