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
  while (!gameOk) {
    for (let i = 0; i < rowSize; i++) {
      matrix[i] = new Array(columsSize).fill(0);
    }
    let compte = 1;
    let currentPos = arrival;
    matrix[currentPos[0]][currentPos[1]] = 1;
    let history = [currentPos];
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
  return matrix;
}

export { generateMatrix };
