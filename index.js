const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

/**
 * A class that represents the playing field.
 */
class Field {
  /**
   * The class constructor.
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
    for (let y = 0; y < this._field.length; y++) {
      let line = '';
      for (let x = 0; j < this._field[x].length; x++) {
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
   * @return {string} Either of three values: moved, won, or lost.
   */
  move(direction) {
    this._x += direction[0];
    this._y += direction[1];

    if (typeof this._field[this._y] === 'undefined') {
      return 'lost';
    }

    const tile = this._field[this._y][this._x];
    if (tile === hat) {
      this._field[this._y][this._x] = pathCharacter;
      return 'won';
    } else if (tile === fieldCharacter || tile === pathCharacter) {
      this._field[this._y][this._x] = pathCharacter;
      return 'moved';
    } else if (tile === hole) {
      return 'fell';
    } else {
      return 'lost';
    }
  }

  /**
   * A method to generate a playing field.
   * @param {number} height The height of the field.
   * @param {number} width The width of the field.
   * @param {number} percentageHoles The percentage of the field covered in
   * holes.
   * @return {arrray} A two-dimentional array representing the playing field.
   */
  static generateField(height, width, percentageHoles) {
    const field = this.initializeField(height, width);

    let randomIndex = this.getRandomIndex(height, width);
    let x = randomIndex[0];
    let y = randomIndex[1];
    field[y][x] = pathCharacter;

    randomIndex = this.getRandomIndex(height, width);
    x = randomIndex[0];
    y = randomIndex[1];
    do {
      if (field[y][x] === fieldCharacter) {
        field[y][x] = hat;
      } else {
        randomIndex = this.getRandomIndex(height, width);
        x = randomIndex[0];
        y = randomIndex[1];
      }
    } while (field[y][x] !== hat);

    const holesNeeded = Math.floor((percentageHoles / 100) * height * width);
    for (let i = 0; i < holesNeeded; i++) {
      randomIndex = this.getRandomIndex(height, width);
      x = randomIndex[0];
      y = randomIndex[1];
      do {
        if (field[y][x] === fieldCharacter) {
          field[y][x] = hole;
        } else {
          randomIndex = this.getRandomIndex(height, width);
          x = randomIndex[0];
          y = randomIndex[1];
        }
      } while (field[y][x] !== hole);
    }

    return field;
  }

  /**
   * A method to initialize a field with the {@see fieldCharacter}.
   * @param {number} height The height of the field.
   * @param {number} width The width of the field.
   * @return {array} A two-dimentional array representing the field.
   */
  static initializeField(height, width) {
    const field = [];
    for (let y = 0; y < height; y++) {
      field[y] = [];
      for (let x = 0; x < width; x++) {
        field[y][x] = fieldCharacter;
      }
    }
    return field;
  }

  /**
   * A method to return a random x and y coordinate on the field.
   * @param {number} height The height of the field.
   * @param {number} width The width of the field.
   * @return {array} A random  x and y coordinate on the field.
   */
  static getRandomIndex(height, width) {
    const index = [];
    index[0] = Math.floor(Math.random() * width);
    index[1] = Math.floor(Math.random() * height);
    return index;
  }
}
/**
 * A class to get the player's input.
 */
class PlayerInput {
  /**
   * @return {array} An array with exactly two elements representing the x and y
   * translation coordinates for the player's movement.
   */
  static promptDirection() {
    const input = prompt('Enter the direction (`u`, `d`, `l`, or, `r`): ');
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

const field1 = [
  ['*', '░', 'O', '░', '░', '^'],
  ['░', '░', 'O', '░', '░', 'O'],
  ['O', '░', 'O', 'O', '░', '░'],
  ['░', '░', '░', '░', 'O', '░'],
  ['░', 'O', 'O', '░', '░', '░'],
  ['░', '░', '░', '░', '░', '░'],
];

/**
 * This class represents the game loop and logic.
 */
class GameLogic {
  /**
   * This method runs the game loop.
   */
  static run() {
    const field = new Field(field1);
    let gameOver = false;
    while (!gameOver) {
      field.print();

      switch (field.move(PlayerInput.promptDirection())) {
        case 'won':
          console.log('Congratulations! You found your hat.');
          gameOver = true;
          break;
        case 'fell':
          console.log('Game Over! You fell into a hole.');
          gameOver = true;
          break;
        case 'lost':
          console.log('Game Over! You are out of bounds.');
          gameOver = true;
          break;
      }
    }
  }
}

GameLogic.run();
