# Drawing Program

Written by Gaurav Sharma for Credit Suisse application exercise.

## Requirements

- Node version 12 or greater.

## Instructions to run program

- Execute the following command to install package dependencies:
  > npm install
- Execute the following command to run the application:
  > npm run app
- Execute the following command to run unit tests:
  > npm test

## Assumptions

The program consists of a canvas board on which the user can draw shapes, based on the commands in the requirements txt file. For any coordinates that lie outside the dimensions of the canvas board, the command will be regarded as invalid, and the user will be asked to provide the command again.
Extra parameters in commands are accepted but treated as garbage and omitted. For example, 'L 1 3 1 7 lorem 6 ipsum 7' only 'L 1 3 1 7' will be treated as a command and included in the validation.
The commands are case sensitive.
