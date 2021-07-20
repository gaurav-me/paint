const {
  getValidatedCommand,
  getValidatedCanvasSize,
} = require('../src/common/validatedInputs');
const Input = require('../src/components/Input');
const Line = require('../src/components/Line');
const Rectangle = require('../src/components/Rectangle');

describe('Tests the input validators correctly catch invalid input for different kinds of user input', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  const canvas = { width: 20, height: 10 };

  it('should accept valid command to create canvas of specific dimensions', async () => {
    const mockInput = jest.spyOn(Input.prototype, 'ask');
    mockInput.mockImplementation(() => 'C 5 4');
    const { meta, width, height } = await getValidatedCanvasSize(
      "Please enter dimensions of the canvas in the format 'C width height': "
    );
    expect(width).toBe(5);
    expect(height).toBe(4);
    expect(meta.commandType).toBe('C');
    expect(meta.quit).toBeFalsy();
    expect(mockInput).toHaveBeenCalledTimes(1);
  });
  it('should reject invalid create command with zero or negative dimensions', async () => {
    const mockInput = jest.spyOn(Input.prototype, 'ask');
    mockInput.mockImplementationOnce(() => 'C 5 -4');
    mockInput.mockImplementationOnce(() => 'C 0 4');
    mockInput.mockImplementationOnce(() => 'C 7 6');
    const { meta, width, height } = await getValidatedCanvasSize(
      "Please enter dimensions of the canvas in the format 'C width height': "
    );
    expect(width).toBe(7);
    expect(height).toBe(6);
    expect(meta.commandType).toBe('C');
    expect(meta.quit).toBeFalsy();
    expect(mockInput).toHaveBeenCalledTimes(3);
  });
  it('should quit when the Q command is given', async () => {
    const mockInput = jest.spyOn(Input.prototype, 'ask');
    mockInput.mockImplementation(() => 'Q');
    const { meta } = await getValidatedCanvasSize(
      "Please enter dimensions of the canvas in the format 'C width height': "
    );
    expect(meta.quit).toBeTruthy();
    expect(mockInput).toHaveBeenCalledTimes(1);
  });
  it('should accept valid command to update canvas with line', async () => {
    const mockInput = jest.spyOn(Input.prototype, 'ask');
    mockInput.mockImplementation(() => 'L 1 5 1 2');
    const { meta, figure } = await getValidatedCommand(
      'Ready for next command: ',
      canvas
    );
    expect(figure).toBeInstanceOf(Line);
    expect(figure.x1).toBe(1);
    expect(figure.x2).toBe(1);
    expect(figure.y1).toBe(5);
    expect(figure.y2).toBe(2);
    expect(meta.commandType).toBe('L');
    expect(meta.quit).toBeFalsy();
    expect(mockInput).toHaveBeenCalledTimes(1);
  });
  it('should reject invalid add line command with zero or negative dimensions', async () => {
    const mockInput = jest.spyOn(Input.prototype, 'ask');
    mockInput.mockImplementationOnce(() => 'L 1 3 -1 5');
    mockInput.mockImplementationOnce(() => 'L 1 0 1 2');
    mockInput.mockImplementationOnce(() => 'L 1 5 1 2');
    const { meta, figure } = await getValidatedCommand(
      'Ready for next command: ',
      canvas
    );
    expect(figure).toBeInstanceOf(Line);
    expect(figure.x1).toBe(1);
    expect(figure.x2).toBe(1);
    expect(figure.y1).toBe(5);
    expect(figure.y2).toBe(2);
    expect(meta.commandType).toBe('L');
    expect(meta.quit).toBeFalsy();
    expect(mockInput).toHaveBeenCalledTimes(3);
  });
  it('should accept valid command to update canvas with rectangle', async () => {
    const mockInput = jest.spyOn(Input.prototype, 'ask');
    mockInput.mockImplementationOnce(() => 'R 1 3 4 5');
    const { meta, figure } = await getValidatedCommand(
      'Ready for next command: ',
      canvas
    );
    expect(figure).toBeInstanceOf(Rectangle);
    expect(figure.x1).toBe(1);
    expect(figure.x2).toBe(4);
    expect(figure.y1).toBe(3);
    expect(figure.y2).toBe(5);
    expect(meta.commandType).toBe('R');
    expect(meta.quit).toBeFalsy();
    expect(mockInput).toHaveBeenCalledTimes(1);
  });
  it('should reject invalid add rectangle command with zero or negative dimensions', async () => {
    const mockInput = jest.spyOn(Input.prototype, 'ask');
    mockInput.mockImplementationOnce(() => 'R 1 0 4 5');
    mockInput.mockImplementationOnce(() => 'R 1 3 -4 5');
    mockInput.mockImplementationOnce(() => 'R 1 3 4 5');
    const { meta, figure } = await getValidatedCommand(
      'Ready for next command: ',
      canvas
    );
    expect(figure).toBeInstanceOf(Rectangle);
    expect(figure.x1).toBe(1);
    expect(figure.x2).toBe(4);
    expect(figure.y1).toBe(3);
    expect(figure.y2).toBe(5);
    expect(meta.commandType).toBe('R');
    expect(meta.quit).toBeFalsy();
    expect(mockInput).toHaveBeenCalledTimes(3);
  });
  it('should accept valid command to update canvas with fill', async () => {
    const mockInput = jest.spyOn(Input.prototype, 'ask');
    mockInput.mockImplementationOnce(() => 'B 1 3 o');
    const { meta, figure } = await getValidatedCommand(
      'Ready for next command: ',
      canvas
    );
    expect(figure.x).toBe(1);
    expect(figure.y).toBe(3);
    expect(figure.c).toBe('o');
    expect(meta.commandType).toBe('B');
    expect(meta.quit).toBeFalsy();
    expect(mockInput).toHaveBeenCalledTimes(1);
  });
  it('should reject invalid fill command with zero, negative dimensions or long character fills', async () => {
    const mockInput = jest.spyOn(Input.prototype, 'ask');
    mockInput.mockImplementationOnce(() => 'B 0 3 o');
    mockInput.mockImplementationOnce(() => 'B 1 -3 o');
    mockInput.mockImplementationOnce(() => 'B 1 -3 oo');
    mockInput.mockImplementationOnce(() => 'B 1 3 o');
    const { meta, figure } = await getValidatedCommand(
      'Ready for next command: ',
      canvas
    );
    expect(figure.x).toBe(1);
    expect(figure.y).toBe(3);
    expect(figure.c).toBe('o');
    expect(meta.commandType).toBe('B');
    expect(meta.quit).toBeFalsy();
    expect(mockInput).toHaveBeenCalledTimes(4);
  });
  it('should quit when the Q command is given', async () => {
    const mockInput = jest.spyOn(Input.prototype, 'ask');
    mockInput.mockImplementation(() => 'Q');
    const { meta } = await getValidatedCommand(
      'Invalid command, please try again: '
    );
    expect(meta.quit).toBeTruthy();
    expect(mockInput).toHaveBeenCalledTimes(1);
  });
});
