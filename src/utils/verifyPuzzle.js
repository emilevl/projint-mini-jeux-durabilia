import { generateMatrix } from './generateRandomPath.js';
import tiles from '../assets/data/tiles.json';

const neighbors = (matrix, [a, b]) => {
  let rowSize = matrix.length;
  let columsSize = matrix[0].length;
  let neighbors = [];
  // console.log('row taille', rowSize, columsSize);
  if (a < rowSize - 1 && a > 0 && b < columsSize - 1 && b > 0) {
    neighbors.push([a - 1, b], [a, b - 1], [a, b + 1], [a + 1, b]);
  } else {
    if (a < 1 && b > 0 && b < columsSize - 1) {
      neighbors.push([a + 1, b], [a, b - 1], [a, b + 1]);
    }
    if (a == rowSize - 1 && b > 0 && b < columsSize - 1) {
      neighbors.push([a - 1, b], [a, b - 1], [a, b + 1]);
    }
    if (b < 1 && a < rowSize - 1 && a > 0) {
      neighbors.push([a - 1, b], [a + 1, b], [a, b + 1]);
    }
    if (b == columsSize - 1 && a < rowSize - 1 && a > 0) {
      neighbors.push([a + 1, b], [a - 1, b], [a, b - 1]);
    }
    if (b == columsSize - 1 && a == 0) {
      neighbors.push([a + 1, b], [a, b - 1]);
    }
    if (b == 0 && a == 0) {
      neighbors.push([a + 1, b], [a, b + 1]);
    }
    if (b == 0 && a == rowSize - 1) {
      neighbors.push([a - 1, b], [a, b + 1]);
    }
    if (b == columsSize - 1 && a == rowSize - 1) {
      neighbors.push([a, b - 1], [a - 1, b]);
    }
  }

  return neighbors;
};

function initFlowMap(rows, cols) {
  const flowMap = [];
  for (let row = 0; row < rows; row++) {
    flowMap[row] = [];
    for (let col = 0; col < cols; col++) {
      flowMap[row][col] = false;
    }
  }
  return flowMap;
}

function flowFieldTo(row, col, matrix) {
  const flowMap = initFlowMap(matrix.length, matrix[0].length);

  const frontier = [];

  frontier.push({ row, col });
  flowMap[row][col] = { row, col };

  while (frontier.length > 0) {
    const cell = frontier.shift();

    // console.log('la cell', cell);
    connexTiles(matrix, [cell.row, cell.col]).forEach((next) => {
      if (flowMap[next.row][next.col] === false) {
        frontier.push(next);

        flowMap[next.row][next.col] = cell;
      }
    });
  }

  flowMap[row][col] = false;
  return flowMap;
}

const connexTiles = (matrix, currentTile) => {
  let currentNeighbors = neighbors(matrix, currentTile);

  let connectedTiles = [];

  currentNeighbors.forEach((neighbor) => {
    if (!connectedTiles.includes(neighbor)) {
      if (neighbor[0] > currentTile[0]) {
        // case en dessous

        if (matrix[currentTile[0]][currentTile[1]].sides[2] == 1 && matrix[neighbor[0]][neighbor[1]].sides[0] == 1) {
          connectedTiles.push(neighbor);
        }
      }
      if (neighbor[0] < currentTile[0]) {
        // case au dessus

        if (matrix[currentTile[0]][currentTile[1]].sides[0] == 1 && matrix[neighbor[0]][neighbor[1]].sides[2] == 1) {
          connectedTiles.push(neighbor);
        }
      }
      if (neighbor[1] > currentTile[1]) {
        // à droite

        if (matrix[currentTile[0]][currentTile[1]].sides[1] == 1 && matrix[neighbor[0]][neighbor[1]].sides[3] == 1) {
          connectedTiles.push(neighbor);
        }
      }
      if (neighbor[1] < currentTile[1]) {
        // à gauche

        if (matrix[currentTile[0]][currentTile[1]].sides[3] == 1 && matrix[neighbor[0]][neighbor[1]].sides[1] == 1) {
          connectedTiles.push(neighbor);
        }
      }
    }
  });
  let tabreturn = [];
  connectedTiles.forEach((element) => {
    tabreturn.push({ row: element[0], col: element[1] });
  });
  return tabreturn;
};

function VerifyMatrix(matrix, finish = [4, 4]) {
  // let matrix = generateMatrix([4, 4], 5, 5, 9);
  // for (let i = 0; i < matrix.length; i++) {
  //   for (let n = 0; n < matrix[i].length; n++) {
  //     matrix[i][n] = { type: matrix[i][n], sides: tiles.filter((element) => element.type == matrix[i][n])[0].sides };
  //   }
  // }
  // console.log('la matrix 2', matrix);

  if (matrix[0][0].sides[3] == 1) {
    initFlowMap(5, 5);
    let map = flowFieldTo(0, 0, matrix);
    console.log('map', map[4][4]);
    let solved = false;
    if (map[matrix.length - 1][matrix[0].length - 1] != false && matrix[matrix.length - 1][matrix[0].length - 1].sides[1] == 1) {
      solved = true;
    }
    console.log(`solved: ${solved}`);
    return [map, solved];
  }
}

export { VerifyMatrix };
