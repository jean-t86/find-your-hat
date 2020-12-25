const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

/**
 * A class that represents the playing field
 */
class Field {
  /**
   * The class constructor
   * @param {array} field - a two dimentional array representing the playfield.
   */
  constructor(field) {
    this._field = field;
    this._x = 0;
    this._y = 0;
  }

  /**
   * Prints the field to the console.
   */
  print() {
    for (let i = 0; i < this._field.length; i++) {
      let line = '';
      for (let j = 0; j < this._field[i].length; j++) {
        line += this._field[i][j];
      }
      console.log(line);
    }
  }

  /**
   * This method tries to move the player through the field in the chosen.
   * direction.
   * @param {array} direction - An array with exactly two elements representing
   * the x and ytranslation coordinates for the player's movement.
   * @return {string} Either of three values: moved, won, or lost
   */
  move(direction) {
    this._x += direction[0];
    this._y += direction[1];
    const tile = this._field[this._y][this._x];
    if (tile === hat) {
      this._field[this._y][this._x] = pathCharacter;
      return 'won';
    } else if (tile === fieldCharacter || tile === pathCharacter) {
      this._field[this._y][this._x] = pathCharacter;
      return 'moved';
    } else {
      return 'lost';
    }
  }
}

/**
 * A class to get the player's input
 */
class PlayerInput {
  /**
   * @return {array} An array with exactly two elements representing the x and y
   * translation coordinates for the player's movement.
   */
  static promptDirection() {
    const input = prompt('Enter the direction: ');
    const direction = [0, 0];

    switch (input) {
      case 'l':
        direction[0] = -1;
        break;
      case 'r':
        direction[0] = 1;
        break;
      case 'u':
        direction[1] = -1;
        break;
      case 'd':
        direction[1] = 1;
        break;
    }

    return direction;
  }
}

const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

// console.log(myField.print());
// console.log(PlayerInput.promptDirection());
console.log(`Move: ${myField.move([0, 1])}`);
console.log(`Move: ${myField.move([1, 0])}`);
console.log(myField.print());
