const input = require("./Input");
const Canvas = require("./Canvas");

const isValidNumber = (arg) => (arg && arg > 0)

const getValidatedCommand = async ({ msg, requiredCommand = "" }) => {
  const command = await input(msg);
  const [commandType, arg1, arg2, arg3, arg4] = (command && command.split(" ")) || [];
  if (
    (requiredCommand && commandType !== requiredCommand) || command.length > 3 || !isValidNumber(arg1) || !isValidNumber(arg2) || !isValidNumber(arg3) || !isValidNumber(arg4)
  )
    getValidatedCommand("Incorrect command format. Please try again: ");

  return [commandType, arg1, arg2];
};

const start = async () => {
  console.log("Program started.");
  const [width, height] = await getValidatedCommand(
    {msg: "Please enter canvas dimensions to begin.", requiredCommand: "C"}
  );

  console.log("\n");

  const canvas = new Canvas(width, height);
  canvas.createBoard();

  console.log("\n");

  let active = true;
  while (active) {
    const [commandType, ...args] = await getValidatedCommand({
      requiredCommand: "C",
      msg: "Enter command: ",
    });

    const isCommandAcceptable = findError({commandType })

    switch (commandType) {
      case "L":
        canvas.line(...args);
        canvas.draw();
        break;
      case "R":
        canvas.rectangle(...args);
        canvas.draw();
        break;
      case "F":
        canvas.fill(...args);
        canvas.draw();
        break;
      case "Q":
        active = false;
        break;
    }
  }

  // canvas.line(1, 2, 6, 2);
  // canvas.line(6, 3, 6, 4);
  // canvas.rectangle(14, 1, 18, 3);
  // canvas.fill(10, 3, "o");
  // canvas.draw();

  canvas.clear();
  console.log("Program ended");

  return;
};

module.exports = start;
