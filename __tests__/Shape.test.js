const Line = require('../src/components/Line');
const Rectangle = require('../src/components/Rectangle');
const Fill = require('../src/components/Fill');

describe('Tests creation of different shapes', () => {
  const canvas = { height: 10, width: 20 };

  it('should create a new Line instance with correct attributes', () => {
    const line = new Line(canvas, 2, 4, 2, 8);
    expect(line.maxWidth).toBe(20);
    expect(line.maxHeight).toBe(10);
    expect(line.x1).toBe(2);
    expect(line.y1).toBe(4);
    expect(line.x2).toBe(2);
    expect(line.y2).toBe(8);
    expect(line).toBeInstanceOf(Line);
  });
  it('should accept a valid line', () => {
    const line = new Line(canvas, 2, 4, 2, 8);
    const validation = line.validate();
    expect(validation.success).toBeTruthy();
  });
  it('should reject a diagonal line', () => {
    const line = new Line(canvas, 2, 3, 4, 5);
    const validation = line.validate();
    expect(validation.success).toBeFalsy();
    expect(validation.msg).toBe('Coordinates not valid.');
  });
  it('should reject a line with incomplete coordinates', () => {
    const line = new Line(canvas, 2, 3, 2);
    const validation = line.validate();
    expect(validation.success).toBeFalsy();
    expect(validation.msg).toBe('Coordinates not valid.');
  });
  it('should reject a line with negative coordinates', () => {
    const canvas = { height: 10, width: 20 };
    const line = new Line(canvas, 2, -3, 2, 5);
    const validation = line.validate();
    expect(validation.success).toBeFalsy();
    expect(validation.msg).toBe('Coordinates not valid.');
  });
  it('should reject a line outside the canvas height limit', () => {
    const line = new Line(canvas, 2, 2, 2, 11);
    const validation = line.validate();
    expect(validation.success).toBeFalsy();
    expect(validation.msg).toBe('Line height is beyond canvas size.');
  });
  it('should reject a line outside the canvas width limit', () => {
    const line = new Line(canvas, 2, 8, 21, 8);
    const validation = line.validate();
    expect(validation.success).toBeFalsy();
    expect(validation.msg).toBe('Line width is beyond canvas size.');
  });
  it('should create a new Rectangle instance with correct attributes', () => {
    const rectangle = new Rectangle(canvas, 2, 4, 15, 8);
    expect(rectangle.maxWidth).toBe(20);
    expect(rectangle.maxHeight).toBe(10);
    expect(rectangle.x1).toBe(2);
    expect(rectangle.y1).toBe(4);
    expect(rectangle.x2).toBe(15);
    expect(rectangle.y2).toBe(8);
    expect(rectangle).toBeInstanceOf(Rectangle);
  });
  it('should accept a valid rectangle', () => {
    const rectangle = new Rectangle(canvas, 2, 4, 15, 8);
    const validation = rectangle.validate();
    expect(validation.success).toBeTruthy();
  });
  it('should reject a rectangle with incomplete coordinates', () => {
    const rectangle = new Rectangle(canvas, 2, 3, 2);
    const validation = rectangle.validate();
    expect(validation.success).toBeFalsy();
    expect(validation.msg).toBe('Coordinates not valid.');
  });
  it('should reject a rectangle with negative coordinates', () => {
    const rectangle = new Rectangle(canvas, 2, -3, 15, 5);
    const validation = rectangle.validate();
    expect(validation.success).toBeFalsy();
    expect(validation.msg).toBe('Coordinates not valid.');
  });
  it('should reject a rectangle outside the canvas height limit', () => {
    const rectangle = new Rectangle(canvas, 2, 5, 8, 11);
    const validation = rectangle.validate();
    expect(validation.success).toBeFalsy();
    expect(validation.msg).toBe('Figure height is beyond canvas size.');
  });
  it('should reject a rectangle outside the canvas width limit', () => {
    const rectangle = new Rectangle(canvas, 2, 1, 21, 8);
    const validation = rectangle.validate();
    expect(validation.success).toBeFalsy();
    expect(validation.msg).toBe('Figure width is beyond canvas size.');
  });
  it('should accept a valid fill area', () => {
    const fill = new Fill(canvas, 20, 10, 'o');
    const validation = fill.validate();
    expect(validation.success).toBeTruthy();
  });
  it('should reject a fill with incomplete coordinates', () => {
    const fill = new Fill(canvas, 2, 'o');
    const validation = fill.validate();
    expect(validation.success).toBeFalsy();
    expect(validation.msg).toBe('Coordinates not valid.');
  });
  it('should reject a fill with negative coordinates', () => {
    const fill = new Fill(canvas, 2, -3, 'o');
    const validation = fill.validate();
    expect(validation.success).toBeFalsy();
    expect(validation.msg).toBe('Coordinates not valid.');
  });
  it('should reject a fill outside the canvas height limit', () => {
    const fill = new Fill(canvas, 2, 20, 'o');
    const validation = fill.validate();
    expect(validation.success).toBeFalsy();
    expect(validation.msg).toBe('Fill coordinates are beyond canvas height.');
  });
  it('should reject a fill outside the canvas width limit', () => {
    const fill = new Fill(canvas, 30, 5, 'o');
    const validation = fill.validate();
    expect(validation.success).toBeFalsy();
    expect(validation.msg).toBe('Fill coordinates are beyond canvas width.');
  });
  it('should reject a fill with more than 1 character to fill', () => {
    const fill = new Fill(canvas, 15, 5, 'ae');
    const validation = fill.validate();
    expect(validation.success).toBeFalsy();
    expect(validation.msg).toBe('Fill should be of 1 character length.');
  });
  it('should reject a fill with missing fill character', () => {
    const fill = new Fill(canvas, 15, 5);
    const validation = fill.validate();
    expect(validation.success).toBeFalsy();
    expect(validation.msg).toBe('Fill should be of 1 character length.');
  });
});
