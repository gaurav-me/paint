# Drawing Program

Simple command line drawing program based on MS Paint.

## Requirements

- Node version 10 or greater.

## Instructions to run program

- Execute the following command to install package dependencies:
  > npm install
- Execute the following command to run the application:
  > npm start
- Execute the following command to run unit tests:
  > npm run test:All

## Assumptions

The program consists of a canvas board on which the user can draw shapes. For any coordinates that lie outside the dimensions of the canvas board, the command will be regarded as invalid, and the user will be asked to provide the command again.
Extra parameters in commands are accepted but treated as garbage and omitted. For example, 'L 1 3 1 7 lorem 6 ipsum 7' only 'L 1 3 1 7' will be treated as a command and included in the validation. All commands are case sensitive.

## Commands
```
C w h           Creates a new canvas of width w and height h.
L x1 y1 x2 y2   Creates a new line from (x1,y1) to (x2,y2). Currently only
                horizontal or vertical lines are supported. Horizontal and vertical lines
                will be drawn using the 'x' character.
R x1 y1 x2 y2   Creates a new rectangle, whose upper left corner is (x1,y1) and
                lower right corner is (x2,y2). Horizontal and vertical lines will be drawn
                using the 'x' character.
B x y c         Fills the entire area connected to (x,y) with "colour" c. The
                behavior of this is the same as that of the "bucket fill" tool in paint
                programs.
Q               Quits the program.
```
