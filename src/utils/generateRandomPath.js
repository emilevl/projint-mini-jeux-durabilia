import tiles from '../assets/data/tiles.json';
function noGoingBack(ListPossibles, matrix) {
  let CurrposNoPath = [];
  ListPossibles.forEach((element) => {
    if (matrix[element[0]][element[1]] == 0) {
      CurrposNoPath.push(element);
    }
  });

  return CurrposNoPath;
}

function possiblesMoves(x, y, matrix, numberofRows, numberofColumns) {
  let allPos = { up: [x - 1, y], down: [x + 1, y], left: [x, y - 1], right: [x, y + 1] };
  let currPos = [];
  let rowSize = numberofRows;
  let columsSize = numberofColumns;
  // if (pass.includes([x, y]))

  if (x < rowSize - 1) {
    currPos.push(allPos.down);
  }
  if (x > 0) {
    currPos.push(allPos.up);
  }
  if (y > 0) {
    currPos.push(allPos.left);
  }
  if (y < columsSize - 1) {
    currPos.push(allPos.right);
  }
  return noGoingBack(currPos, matrix);
}

function verifyMatrix(mat, steps) {
  let isValid = true;
  for (let i = 1; i <= steps; i++) {
    if (!mat.some((row) => row.includes(i))) {
      isValid = false;
    }
  }
  return isValid;
}

let randomProperty = function (obj) {
  let keys = Object.keys(obj);
  return obj[keys[(keys.length * Math.random()) << 0]];
};

function generateMatrix(arrival, numberofRows, numberofColumns, randomize) {
  let rowSize = numberofRows;
  let columsSize = numberofColumns;

  let matrix = new Array(rowSize);
  for (let i = 0; i < rowSize; i++) {
    matrix[i] = new Array(columsSize).fill(0);
  }
  let lastPositionx;
  let lastPositiony;

  let gameOk = false;
  let history = [];
  while (!gameOk) {
    for (let i = 0; i < rowSize; i++) {
      matrix[i] = new Array(columsSize).fill(0);
    }
    history = [];
    let compte = 1;
    let currentPos = arrival;
    matrix[currentPos[0]][currentPos[1]] = 1;

    history.push(currentPos);

    for (let i = 0; i < randomize; i++) {
      let ListMoves = possiblesMoves(currentPos[0], currentPos[1], matrix, rowSize, columsSize);
      let move = ListMoves[Math.floor(Math.random() * ListMoves.length)];
      if (!move) {
        break;
      }
      currentPos = move;
      history.push(move);
      compte += 1;

      matrix[currentPos[0]][currentPos[1]] = compte;
      lastPositionx = currentPos[1];
      lastPositiony = currentPos[0];
    }

    while (lastPositionx != 0) {
      compte += 1;

      matrix[lastPositiony][(lastPositionx -= 1)] = compte;
      history.push([lastPositiony, lastPositionx]);
    }
    while (lastPositiony != 0) {
      compte += 1;

      matrix[(lastPositiony -= 1)][lastPositionx] = compte;
      history.push([lastPositiony, lastPositionx]);
    }

    gameOk = verifyMatrix(matrix, history.length);
  }

  history.push([0, -1]);
  for (let i = 1; i < history.length - 2; i++) {
    if (history[i + 1][0] != history[i][0] || history[i - 1][1] != history[i][1]) {
    } else {
    }
  }

  let tilesType = { curved: ['2b', '3', '4', '2b', '2b', '2b'], right: ['2a', '3', '4', '2a', '2a', '2a'], useless: ['0', '1'] };
  let Alltiles = ['2b', '3', '4', '2a', '1', '0', '2a', '2a', '2b', '2b', '2a', '2b'];

  if (history[1][0] != history[0][0]) {
    matrix[history[0][0]][history[0][1]] = tilesType.curved[Math.floor(Math.random() * 6)];
  } else {
    matrix[history[0][0]][history[0][1]] = tilesType.right[Math.floor(Math.random() * 6)];
  }

  for (let i = 1; i < history.length - 2; i++) {
    if (
      (history[i + 1][0] == history[i - 1][0] && history[i + 1][1] != history[i - 1][1]) ||
      (history[i + 1][0] != history[i - 1][0] && history[i + 1][1] == history[i - 1][1])
    ) {
      matrix[history[i][0]][history[i][1]] = tilesType.right[Math.floor(Math.random() * 6)];
    } else {
      matrix[history[i][0]][history[i][1]] = tilesType.curved[Math.floor(Math.random() * 6)];
    }
  }
  if (history[history.length - 2][0] != history[history.length - 3][0]) {
    matrix[history[history.length - 2][0]][history[history.length - 2][1]] = tilesType.curved[Math.floor(Math.random() * 6)];
  } else {
    matrix[history[history.length - 2][0]][history[history.length - 2][1]] = tilesType.right[Math.floor(Math.random() * 6)];
  }

  // matrix.forEach((element) => {
  //   element.forEach((elem2) => {
  //     console.log('dans la boucle', elem2);
  //     if (elem2 == 0) {
  //       console.log('oui');
  //       let tileType = randomProperty(tilesType);
  //       console.log('ça marche', tileType.length);
  //       elem2 = 'bonjour';
  //       //elem2 = tileType[Math.floor(Math.random() * tilesType.length)];
  //     }
  //   });
  // });

  for (let i = 0; i < rowSize; i++) {
    for (let n = 0; n < columsSize; n++) {
      if (matrix[i][n] == 0) {
        // let tileType = randomProperty(tilesType);
        matrix[i][n] = Alltiles[Math.floor(Math.random() * Alltiles.length)];
      }
    }
  }

  //tiles.filter((element) => element.type == matrix[i][n])[0].sides,

  for (let i = 0; i < matrix.length; i++) {
    for (let n = 0; n < matrix[i].length; n++) {
      matrix[i][n] = { type: matrix[i][n], sides: tiles.filter((element) => element.type == matrix[i][n])[0].sides };
    }
  }

  return matrix;
}

export { generateMatrix };
