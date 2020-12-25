const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

/**
 * A class that represents the playing field
 */
class Field {
  /**
   * 
   * @param {array} field - a two dimentional array representing the playfield.
   */
  constructor(field) {
    this._field = field;
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
}

const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

console.log(myField.print());
