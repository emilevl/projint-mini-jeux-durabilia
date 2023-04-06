import { generateMatrix } from '../../utils/generateRandomPath.js';

function matrixSolvable(arrival, nbRows, nbColums, randomize) {
  let path = generateMatrix(arrival, nbRows, nbColums, randomize);
  path.forEach((element) => {
    element.forEach();
  });
}
