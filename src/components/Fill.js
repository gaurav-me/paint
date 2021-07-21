const { isValidNumber } = require('../common/utils');
const Figure = require('./Figure');

class Fill extends Figure {
  constructor(canvas = {}, x1, y1, c) {
    super(canvas, x1, y1);
    this.c = c;
  }

  validate() {
    if (!this.maxWidth || !this.maxHeight) {
      return { success: false, msg: 'Board not initialised.' };
    } else if (!isValidNumber(this.x1) || !isValidNumber(this.y1)) {
      return { success: false, msg: 'Coordinates not valid.' };
    } else if (!(this.c && this.c.length === 1)) {
      return { success: false, msg: 'Fill should be of 1 character length.' };
    } else if (this.x1 > this.maxWidth) {
      return {
        success: false,
        msg: 'Fill coordinates are beyond canvas width.',
      };
    } else if (this.y1 > this.maxHeight) {
      return {
        success: false,
        msg: 'Fill coordinates are beyond canvas height.',
      };
    }
    return { success: true };
  }
}

module.exports = Fill;
