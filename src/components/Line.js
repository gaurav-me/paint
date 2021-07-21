const { isValidNumber } = require('../common/utils');
const Figure = require('./Figure');

class Line extends Figure {
  constructor(canvas = {}, x1, y1, x2, y2) {
    super(canvas, x1, y1, x2, y2);
  }

  validate() {
    if (!this.maxWidth || !this.maxHeight) {
      return { success: false, msg: 'Board not initialised.' };
    } else if (
      !isValidNumber(this.x1) ||
      !isValidNumber(this.x2) ||
      !isValidNumber(this.y1) ||
      !isValidNumber(this.y2) ||
      !(this.x1 === this.x2 || this.y1 === this.y2)
    ) {
      return { success: false, msg: 'Coordinates not valid.' };
    } else if (this.x1 > this.maxWidth || this.x2 > this.maxWidth) {
      return { success: false, msg: 'Line width is beyond canvas size.' };
    } else if (this.y1 > this.maxHeight || this.y2 > this.maxHeight) {
      return { success: false, msg: 'Line height is beyond canvas size.' };
    }
    return { success: true };
  }
}

module.exports = Line;
