<script setup>
import Tile from '../puzzle/tile.vue'
import { generateMatrix } from '../../utils/generateRandomPath.js';

const nbCols = 5;
const nbRows = nbCols;
const nbTiles = nbCols * nbRows
const arrival = [nbCols - 1, nbRows - 1]
const lengthPath = 10; //entre 8 et 10 p.ex

const nbColsCss = `repeat(${nbCols}, 1fr)`


const matrix = generateMatrix(arrival, nbRows, nbCols, lengthPath)
const flatMatrix = matrix.flat()
//console.log(flatMatrix);

const rotations = [0, 90, 180, 270]
const randomRotation = Math.floor(Math.random() * rotations.length);
//console.log(rotations[Math.floor(Math.random() * rotations.length)]);


</script>

<template>
    <div id="grid" class="grid-container">
        <div v-for="(tile, i) in flatMatrix" class="grid-item">
            <tile :tileType="tile" :position="i++" :rotation="rotations[Math.floor(Math.random() * rotations.length)]"></tile>
        </div>
    </div>
</template>

<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: v-bind(nbColsCss);
    margin: 0 auto;

    height: fit-content;
    width: fit-content;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.grid-item {
    background-color: #12313C;
    width: 16vh;
    height: 16vh;
}

@media (orientation: portrait) {
    .grid-item {
        width: 16vw;
        height: 16vw;
    }
}
</style>