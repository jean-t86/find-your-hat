/**
 * The representation of a graph.
 */
class Graph {
  /**
   * The constructor for the Graph class.
   * @param {array} grid The two-dimentional array representing the grid.
   */
  constructor(grid) {
    this._grid = grid;
  }

  /**
   * A method to get the value in the grid at the passed in node.
   * @param {Node} node A node in the graph.
   * @return {any} The value in the grid at the position of the passed in node.
   */
  valueAtNode(node) {
    return this._grid[node.row][node.col];
  }

  /**
   * A method to return neighboring nodes. The order is starting at the
   * top and then moving counter-clockwise.
   * @param {Node} node The coordinates in the format 'row, col' for the
   * node.
   * @return {array} An array of {@see Nodes}.
   */
  getNeighbors(node) {
    const neighbors = [];
    // top
    if (typeof this._grid[node.row - 1] != 'undefined' &&
      typeof this._grid[node.row - 1][node.col] != 'undefined') {
      neighbors.push(new Node(node.row - 1, node.col));
    }
    // left
    if (typeof this._grid[node.row] != 'undefined' &&
      typeof this._grid[node.row][node.col - 1] != 'undefined') {
      neighbors.push(new Node(node.row, node.col - 1));
    }
    // bottom
    if (typeof this._grid[node.row + 1] != 'undefined' &&
      typeof this._grid[node.row + 1][node.col] != 'undefined') {
      neighbors.push(new Node(node.row + 1, node.col));
    }
    // right
    if (typeof this._grid[node.row] != 'undefined' &&
      typeof this._grid[node.row][node.col + 1] != 'undefined') {
      neighbors.push(new Node(node.row, node.col + 1));
    }

    return neighbors;
  }
}

/**
 * A Node class used to represent nodes in the {@see Graph} class.
 */
class Node {
  /**
   * The constructor for the Node class.
   * @param {number} row The row of the node in the Graph's grid.
   * @param {number} col The column of the node in the Graph's grid.
   */
  constructor(row, col) {
    this._row = row;
    this._col = col;
  }

  /**
   * @return {number} The row of the node in the Graph's grid.
   */
  get row() {
    return this._row;
  }

  /**
   * @return {number} The column of the node in the Graph's grid.
   */
  get col() {
    return this._col;
  }

  /**
   * @return {string} The Node's coordinates in the format `row, column`
   */
  getKey() {
    return `${this._row}, ${this._col}`;
  }
}

/**
 *
 */
class BreadthFirstSearch {
  /**
   *
   * @param {Graph} graph The graph.
   * @param {Node} start The starting node.
   * @param {Node} goal The goal node.
   * @param {string} obstacleCharacter The character used as obstacle in the
   * graph.
   * @return {array} A dictionary array with keys in the format of
   * Node.getKey(). Each value points to the key of the previously
   * visited node in the graph.
   */
  static traverseGraph(graph, start, goal, obstacleCharacter) {
    const frontier = [];
    frontier.push(start);
    const paths = [];
    paths[start] = null;

    while (frontier.length > 0) {
      const current = frontier.shift();
      if (current === goal) {
        break;
      }

      graph.getNeighbors(current).forEach((next) => {
        if (graph.valueAtNode(next) !== obstacleCharacter &&
          typeof paths[next.getKey()] === 'undefined') {
          frontier.push(next);
          paths[next.getKey()] = current;
        }
      });
    }

    return paths;
  }

  /**
   *
   * @param {Node} start The starting node.
   * @param {Node} goal The goal node.
   * @param {array} paths A dictionary array with keys in the format of
   * Node.getKey(). Each value points to the key of the previously
   * visited node in the graph.
   * @return {array} The array of Nodes to through to reach the goal
   * from the starting node. If the array returned is empty, there
   * exists no paths to the goal node.
   */
  static findPath(start, goal, paths) {
    const path = [];
    if (typeof paths[goal.getKey()] === 'undefined') {
      return path;
    }

    let current = goal;
    while (current != start) {
      path.push(current);
      current = paths[current.getKey()];
    }
    path.push(start);

    return path.reverse();
  }
}

module.exports = {
  Graph,
  Node,
  BreadthFirstSearch,
};

/*
// Usage:

const grid = [
// 0  1  2  3  4  5
  [0, 0, 2, 0, 0, 0], // 0
  [0, 0, 2, 0, 0, 0], // 1
  [0, 2, 2, 1, 0, 0], // 2
  [0, 0, 2, 0, 0, 0], // 3
  [2, 0, 2, 0, 0, 0], // 4
  [0, 0, 2, 0, 0, 0], // 5
];

const startNode = new Node(2, 3);
console.log(startNode.getKey());
console.log(startNode.row);
console.log(startNode.col);

const graph = new Graph(grid);
console.log(graph.getNeighbors(startNode));

const goalNode = new Node(5, 0);
const paths = BreadthFirstSearch.traverseGraph(graph, startNode, goalNode, 2);
const path = BreadthFirstSearch.findPath(startNode, goalNode, paths);
console.log(path);
*/
