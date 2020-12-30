# Find Your Hat
## Table of contents
* [General information](#general-information)
* [Project Description](#project-description)
* [Technologies](#technologies)
* [Setup](#setup)
* [Playing the game](#playing-the-game)
* [Interesting code](#interesting-code)

## General Information
This is a practice lab from the [Back-end Engineer path on Codecademy](https://www.codecademy.com/learn/paths/back-end-engineer-career-path). The course teaches all the major technologies and skills that a back-end engineer needs to know.

This project comes after completing 25% of the course.

## Project Description
The project is a game that runs in the shell. To win the game, the player needs to navigate around holes in a field to find their hat.

The player wins if they make their way to the hat, represented by the `^` character.

The player loses if they:
* fall into a hole, represented by `o`, or
* out of bounds of the field

## Technologies
* JavaScript
* Node.js

## Setup
In order to run the program, you need to install Node.js on your computer:
* [Download](https://nodejs.org/en/download/) the binaries
* If you use Linux, follow the [installation instructions](https://github.com/nodejs/help/wiki/Installation#how-to-install-nodejs-via-binary-archive-on-linux).

Once installed, install the program's dependencies with `npm install` in your terminal with the project's folder as working directory.

You can then run the program by typing `node index.js`.

## Playing the game
In this game, you need to move the character, represented by `*`, to the hat `^`. 

`O` represent holes and need to be avoided.

When you run the game, a field will be printed out to the console.

You can then enter a direction in which to move:
* u - up
* d - down
* l - left
* r - right

## Interesting code
In this project, of particular interest is the implementation of a [Breadth First Search algorigthm](https://github.com/jean-t86/find-your-hat/pull/5). 

In a nutshell, the `Field.generateField` creates a random playing field, whereas `Field.validateField` makes sure that the playing field is a maze that can be solved by the user, i.e. is deterministic.
