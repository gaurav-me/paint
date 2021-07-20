const Figure = require('./Figure');

class Rectangle extends Figure {
  constructor(canvas = {}, x1, y1, x2, y2) {
    super(canvas, x1, y1, x2, y2);
  }
}

module.exports = Rectangle;
